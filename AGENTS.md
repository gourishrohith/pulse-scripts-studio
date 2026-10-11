<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Content sections use separate TanStack file routes and a shared application shell to preserve navigation and direct links.
- Keep private Gemini credentials in Cloud secrets and execute live calls only inside server functions; browser storage is not a secret store.
- Offline scripts and compliance scoring use pure browser-safe helpers with unit tests; scores are preliminary screening, not legal certification.
- Shared shell motion uses IntersectionObserver plus child-list observation for dynamically inserted content and CSS with reduced-motion support; keep animation presentation-only so offline and AI workflows remain unchanged.
