# Dummy Min Test Fullstack Backend

A small, intentionally modular stand-in for the real Full Stack repository (`erp_2Dummy`), built for
testing AI Developer Assist's `POST /ai-developer/chat` flow without the problems of the real repo:

- the real repo has 2000+ files in an inconsistent structure, making it hard to know exactly which files
  were given as AI context, or to audit whether generated code is correct;
- several of its real files exceed the Repository Context Gateway's per-file character budget, which
  blocks `plan_implementation` outright (`FILE_TOO_LARGE`) and burns through the LLM provider's token
  budget on just the `search`/`plan` prompts.

This repo covers the same domain used in chat endpoint testing (inventory low-stock monitoring and
procurement purchase requisitioning), with every file kept small and one feature per folder, so a human
reviewer can tell exactly what context was given and judge whether the AI's generated/modified code is
correct against it.

## Layout

```
backend/
├── inventory/
│   ├── thresholds/              reorder-point configuration per item/store
│   ├── stock-management/        current stock levels
│   ├── low-stock-alert/         the "Low Stock Alert" feature (alert only, no requisition)
│   └── store-conditions/        storage condition rules for items
├── procurement/
│   ├── supplier-requisition-form/   purchase requisition creation/workflow
│   ├── vendor/                  vendor records
│   ├── general-info/            item/category general information
│   └── delivery-notes/          delivery note records against a requisition
├── common/                      auth guard, id generator, shared file schema
├── app.module.ts, main.ts, config.ts
frontend/
├── components/inventory/, components/procurement/
├── customHooks/inventory/, customHooks/procurement/
└── pages/inventory/, pages/procurement/
```

Each backend feature folder follows the same shape as the real repo (`*.module.ts`, `*.controller.ts`,
`*.service.ts`, `entities/*.entity.ts`, `dto/*.dto.ts`, and a `*.controller.spec.ts` for the two feature
folders most used in testing) — familiar to the AI, just far smaller.

## Using this repo as AI context

Once pushed to its own GitHub repository, add it to `config/approved_repositories.json` (in the main
`erp_2` service) with its real `owner`/`repo`, then use its `repositoryId` when creating/continuing an AI
Developer Assist request instead of `erp-2-dummy`.
