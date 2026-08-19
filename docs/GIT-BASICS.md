# Git, from zero

You do not need to understand git. You need about six commands.

---

## 1. What it actually is

**Git** is a save-history system for a folder of files. Every time you "commit", it
photographs the whole folder and remembers who changed what and why. You can go back
to any photograph, forever.

**GitHub** is where that history lives online, so it is backed up and other people can
work on it too.

The mental model: your computer has a copy, GitHub has a copy. `pull` brings GitHub's
changes down to you. `push` sends yours up. That is the whole thing.

---

## 2. One-time setup

**Install git.** Mac: open Terminal, type `git --version`, and if it is missing macOS
offers to install it. Windows: download from <https://git-scm.com/download/win>.

**Tell git who you are.** Once, ever:

```bash
git config --global user.name "Khoi Nguyen"
git config --global user.email "your@email.com"
```

**Get the code onto your machine:**

```bash
git clone https://github.com/khoinguyen-workspace-arch/mts.git
cd mts
```

You now have a folder called `mts`. Every command below is run from inside it.

---

## 3. The daily loop

Five steps, same order, every time.

```bash
git pull                          # 1. get anyone else's changes first
                                  # 2. edit files in your normal editor, save
git status                        # 3. see what you changed
git add .                         # 4. mark all your changes to be saved
git commit -m "Fix hero headline" # 5. save them, with a note about why
git push                          # 6. send them to GitHub
```

If you are the only person touching the repo, step 1 rarely matters — but running it
costs nothing and prevents the single most common mess.

**`git status` is your friend.** It is completely safe, it changes nothing, and it tells
you exactly where you are. Run it whenever you are unsure.

---

## 4. The six commands that matter

| Command | What it does |
|---|---|
| `git status` | Shows what you have changed. Safe. Run it constantly. |
| `git pull` | Downloads changes from GitHub into your folder. |
| `git add .` | Marks everything you changed as ready to save. |
| `git commit -m "message"` | Saves a snapshot with a note. Local only — nobody sees it yet. |
| `git push` | Uploads your commits to GitHub. **This is what makes the site update.** |
| `git log --oneline` | Lists the history, newest first. |

Everything else in git is a variation on these.

---

## 5. Writing commit messages

One line, present tense, says *why* not *what*. The diff already shows what.

Good: `Add HubSpot form ID to change-strata-manager`
Good: `Move hero images off WordPress to /assets/img`
Bad: `update`, `changes`, `asdf`

In six months this list is the only record of why the site is the way it is.

---

## 6. Branches — when you actually need one

A **branch** is a parallel copy where you can experiment without touching the live site.

Skip it for small edits: fixing a typo, adding a form ID. Commit to `main` and push.

Use one when the change is big enough that half-finished is worse than not started —
a new page, a redesign, anything you might abandon:

```bash
git checkout -b new-homepage    # create and switch to a branch
# ...work, commit as normal...
git push -u origin new-homepage # push the branch to GitHub
```

Then open a **pull request** on GitHub — a page that shows exactly what changed and
lets someone review it before it merges into `main`. When it merges, the site updates.

Get back to the main line at any time with `git checkout main`.

---

## 7. When something goes wrong

**Nothing in git is lost as long as you committed it.** Committed work can always be
recovered. That is the whole reason to commit often — treat it like Ctrl+S.

| Situation | Do this |
|---|---|
| Broke a file, have not committed | `git restore path/to/file.html` — reverts it to the last commit |
| Broke everything, have not committed | `git restore .` — reverts every uncommitted change |
| Committed something bad, already pushed | `git revert <commit-id>` then `git push` — makes a new commit that undoes it, keeping history honest |
| Need the commit ID | `git log --oneline` — it is the short code at the start of each line |
| `push` was rejected | Someone else pushed first. Run `git pull`, then `git push` again |

**Never run `git push --force`.** It rewrites history on GitHub and can delete other
people's work. If someone tells you to force push, ask why first.

**Never commit passwords, API keys, or `.env` files.** Once pushed, assume it is public
forever — deleting it later does not remove it from the history. `.gitignore` in this
repo already blocks the usual suspects.

---

## 8. If the command line is not for you

**GitHub Desktop** (<https://desktop.github.com>) does everything above with buttons.
Pull, commit, push are three clicks. The concepts are identical, so this guide still
applies — you just do not type anything.

Most people end up using both: the app for daily edits, the command line when
something unusual happens.
