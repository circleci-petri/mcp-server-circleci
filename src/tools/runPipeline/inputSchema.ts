import { z } from 'zod';
import {
  branchDescription,
  projectSlugDescription,
} from '../sharedInputSchemas.js';

export const runPipelineInputSchema = z.object({
  projectSlug: z.string().describe(projectSlugDescription).optional(),
  branch: z.string().describe(branchDescription).optional(),
  workspaceRoot: z
    .string()
    .describe(
      'The absolute path to the root directory of your project workspace. ' +
        'This should be the top-level folder containing your source code, configuration files, and dependencies. ' +
        'For example: "/home/user/my-project" or "C:\\Users\\user\\my-project"',
    )
    .optional(),
  gitRemoteURL: z
    .string()
    .describe(
      'The URL of the remote git repository. This should be the URL of the repository that you cloned to your local workspace. ' +
        'For example: "https://github.com/user/my-project.git"',
    )
    .optional(),
  projectURL: z
    .string()
    .describe(
      'The URL of the CircleCI project. Can be any of these formats:\n' +
        '- Project URL with branch: https://app.circleci.com/pipelines/gh/organization/project?branch=feature-branch\n' +
        '- Pipeline URL: https://app.circleci.com/pipelines/gh/organization/project/123\n' +
        '- Workflow URL: https://app.circleci.com/pipelines/gh/organization/project/123/workflows/abc-def\n' +
        '- Job URL: https://app.circleci.com/pipelines/gh/organization/project/123/workflows/abc-def/jobs/xyz',
    )
    .optional(),
  pipelineChoiceName: z
    .string()
    .describe(
      'The name of the pipeline to run. This parameter is only needed if the project has multiple pipeline definitions. ' +
        'If not provided and multiple pipelines exist, the tool will return a list of available pipelines for the user to choose from. ' +
        'If provided, it must exactly match one of the pipeline names returned by the tool.',
    )
    .optional(),
  configContent: z
    .string()
    .describe(
      'The content of the CircleCI YAML configuration file for the pipeline.',
    )
    .optional(),
});
