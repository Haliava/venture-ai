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

export const mapApiToFormFields = (fields: ReplyAPI): StartupFormFieldValues => {
  return ({
    idea: fields.idea,
    tags: fields.keywords,
    volume: fields.market_volume,
    compeition: fields.oppontents,
    problem: fields.problem,
    roadmap: fields.roadmap,
    publications: fields.social,
    stategy: fields.strategy,
    users: fields.target_audience,
    team: fields.team,
    utp: fields.uto,
    tech: fields.implementation,
    solution: fields.solution,
  })
}
