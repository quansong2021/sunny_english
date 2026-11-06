#!/usr/bin/env bash
set -euo pipefail

# Parse the entire launcher before Git can replace files in this checkout.
main() {
  local project_root action repo_root changes upstream
  project_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
  cd -- "$project_root"
  action="${1:-start}"
  case "$action" in start|stop|restart|status|logs|backup) ;; *) printf 'Usage: bash deploy-linux.sh [start|stop|restart|status|logs|backup]\n' >&2; return 1 ;; esac

  if [[ "$action" == start ]]; then
    if [[ -e .git ]]; then
      command -v git >/dev/null 2>&1 || { printf 'Git is required to update this checkout.\n' >&2; return 1; }
      repo_root="$(git rev-parse --show-toplevel)" || return 1
      # Git for Windows may print a drive path; compare through cd/pwd.
      repo_root="$(cd -- "$repo_root" && pwd)"
      [[ "$repo_root" == "$project_root" ]] || { printf 'Unexpected repository root.\n' >&2; return 1; }
      changes="$(git status --porcelain --untracked-files=normal)" || return 1
      [[ -z "$changes" ]] || { printf 'Local changes found. Commit or move them before updating. No files were overwritten.\n' >&2; return 1; }
      upstream="$(git rev-parse --abbrev-ref --symbolic-full-name '@{upstream}')" || { printf 'No upstream branch. Configure the branch tracking remote first.\n' >&2; return 1; }
      printf 'Updating source from %s...\n' "$upstream"
      git pull --ff-only || { printf 'Git update failed. Deployment was not started.\n' >&2; return 1; }
    else
      printf 'Source archive detected; no Git repository to update. Deploying the extracted files.\n'
    fi
  fi

  # Load the worker only after synchronization so updated deployment logic takes effect.
  exec bash "$project_root/deploy/linux-run.sh" "$action"
}
main "$@"
