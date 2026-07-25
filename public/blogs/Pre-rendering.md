---
id: 1
title: "Server-side Rendering"
date: "2026-07-20"
category: "Web Development"
readTime: "4 min read"
english_summary: "Server-side Rendering (SSR) is a web development method where HTML is generated on the server for each user request, rather than being pre-built at compile time."
---

Hello: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.
