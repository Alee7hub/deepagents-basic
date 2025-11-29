################### imports and loading environment variables #####################
from typing import Literal
from tavily import TavilyClient
from langchain.chat_models import init_chat_model
from deepagents import create_deep_agent
from deepagents.backends import CompositeBackend, StateBackend, FilesystemBackend
from prompts import main_agent_system_prompt, subagent_system_prompt

from dotenv import load_dotenv
load_dotenv()



################################ defining subagent ################################
tavily_client = TavilyClient()

def internet_search(
    query: str,
    max_results: int = 5,
    topic: Literal["general", "news", "finance"] = "general",
    include_raw_content: bool = False,
):
    """Run a web search"""
    return tavily_client.search(
        query,
        max_results=max_results,
        include_raw_content=include_raw_content,
        topic=topic,
    )

research_subagent = {
    "name": "research-agent",
    "description": "Used to run a web search for a single topic, such as facts, trends, and relevant information",
    "system_prompt": subagent_system_prompt,
    "tools": [internet_search],
    "model": "openai:gpt-4o-mini",
}

################################ defining main agent ################################
subagents = [research_subagent]
model = init_chat_model("openai:gpt-4o-mini")

composite_backend = lambda rt: CompositeBackend(
    default=StateBackend(rt),
    routes={
        "/memories/": FilesystemBackend(root_dir="/Users/lida/Documents/Alis/projects/deepagent/backend/memories/", virtual_mode=True),
    },
)

agent = create_deep_agent(
    system_prompt=main_agent_system_prompt,
    subagents=subagents,
    model=model,
    backend=composite_backend
)

################################ main function ################################
def main(user_query):
    agent.invoke({"messages": [{"role": "user", "content": user_query}]})
    
    # Read and return the generated report
    report_path = "/Users/lida/Documents/Alis/projects/deepagent/backend/memories/report.md"
    try:
        with open(report_path, 'r') as f:
            return f.read()
    except FileNotFoundError:
        return "Report generation failed. No report found."
