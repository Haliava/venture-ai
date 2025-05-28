import { ReplyAPI } from "@/shared/types/analysis";
import { StartupFormFieldValues } from "@/shared/types/form";

export const mapFormFieldsToAPI = (fields: StartupFormFieldValues): ReplyAPI => {
  return ({
    idea: fields.idea,
    keywords: fields.tags,
    market_volume: fields.volume,
    oppontents: fields.compeition,
    problem: fields.problem,
    roadmap: fields.roadmap,
    social: fields.publications,
    status: 'project',
    strategy: fields.stategy,
    target_audience: fields.users,
    team: fields.team,
    uto: fields.utp,
    implementation: fields.tech,
    solution: fields.solution,
  });
}
