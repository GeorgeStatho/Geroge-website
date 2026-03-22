# GitHub Solar System Visual Grammar

## Purpose

This document defines a full visual grammar for an automatically generated GitHub portfolio visualization where:

- **Sun** = GitHub user
- **Planets** = repositories
- **Moons** = branches
- **Rings, dust, trails, comets** = commit activity and notable events

The design goal is not precise analytics first. It is:

1. **Striking at first glance**
2. **Understandable after a few seconds**
3. **Rich on hover, click, and zoom**
4. **Fully generated from GitHub API data**, with no manual repo-by-repo styling required

---

## Core Design Principles

### 1. Summary first
The scene should communicate structure before detail. A viewer should first understand the repo ecosystem, then drill into branch systems, then notice commit activity.

### 2. Stable hierarchy
Use only persistent entities as major bodies:

- User = star
- Repo = planet
- Branch = moon

Commits are usually too numerous to become full orbiting bodies. They should mostly appear as rings, dust, streaks, flares, or occasional comets.

### 3. Automatic generation
All visual choices should be driven by GitHub API data such as:

- repository metadata
- timestamps
- languages
- topics
- archive/fork status
- branch structure
- commit frequency
- additions/deletions for notable commits

### 4. Beauty over completeness
Do not attempt to render all information literally at once. The visualization should privilege legibility, atmosphere, and identity.

### 5. Details on demand
The main scene is an overview. Text-heavy information such as commit messages, branch names, and stats should appear on hover, click, or in a side panel.

---

## Data Model

### User-level data
Use:
- username / display name
- avatar
- total public repos
- follower count if desired
- contribution-like activity summary if available through chosen API strategy

### Repo-level data
Use:
- `name`
- `description`
- `language`
- `topics`
- `stargazers_count`
- `forks_count`
- `watchers_count`
- `open_issues_count`
- `size`
- `fork`
- `archived`
- `default_branch`
- `created_at`
- `updated_at`
- `pushed_at`

### Branch-level data
Use:
- branch name
- protected vs not protected
- latest commit date
- commit count if available from your chosen fetch strategy

### Commit-level data
Use:
- commit date
- additions
- deletions
- changed file count
- commit message
- merge status if inferable
- branch association if available from your model

---

## Visual Hierarchy

### Primary layer
Always emphasized:
- Sun
- Prominent planets
- Selected repo
- Top labels

### Secondary layer
Visible when relevant:
- Moons for high-priority or selected repos
- Repo rings
- Branch orbit lines
- Important event markers

### Tertiary layer
Mostly ambient:
- Commit dust
- Particle fields
- Orbit trails
- Tiny stars or low-priority repos

This hierarchy prevents the scene from collapsing into clutter.

---

## Object Grammar

## Sun

Represents the GitHub user.

### Meaning
The sun is the identity center and overall activity anchor.

### Visual channels
- **Radius** -> total overall activity score
- **Corona intensity** -> recent overall activity
- **Pulse speed** -> activity in the last short window
- **Color** -> usually stable warm white/gold, not heavily data-driven
- **Halo layers** -> can indicate longer-term activity bands

### Guidance
The sun should remain visually stable and iconic. Avoid over-encoding too many variables into it.

---

## Planets

Each repository is a planet orbiting the sun.

### What planets encode
- repository importance
- repository freshness
- repository language/type
- repository character inferred from metadata
- repository activity density

### Planet channels
- **Orbit radius around sun** -> repo recency, preferably based on `pushed_at`
- **Planet size** -> weighted repo importance
- **Color family** -> primary language
- **Glow / atmosphere** -> recent activity freshness
- **Planet class** -> generated archetype based on metadata
- **Surface motifs / structures** -> repo type inferred from GitHub metadata
- **Ring presence** -> historical or sustained commit activity

### Recommended repo importance score
Use a weighted formula such as:

`importance = 0.35*recencyScore + 0.25*sizeScore + 0.20*commitVolume + 0.10*stars + 0.10*forks`

Adjust weights to match portfolio goals.

### Orbit ring recommendation
Use discrete bands rather than continuous spacing:

- Ring 1 -> updated in last 7 days
- Ring 2 -> updated in last 30 days
- Ring 3 -> updated in last 90 days
- Ring 4 -> updated in last year
- Ring 5+ -> older

This makes time readable instantly.

---

## Moons

Moons represent branches.

### Why branches should be moons
Branches are:
- fewer in number than commits
- more persistent
- easier to label
- more structurally meaningful

### Moon channels
- **Moon size** -> branch importance or branch commit weight
- **Moon orbit radius around planet** -> branch recency
- **Moon brightness** -> recent branch activity
- **Moon tint** -> branch type
- **Moon speed** -> activity cadence

### Branch type suggestions
- `main` / `master` -> brightest, largest, most stable moon
- `dev` -> prominent secondary moon
- `release` -> gold-tinted moon
- `feature/*` -> small moons or minor satellites
- `hotfix/*` -> sharper, redder accent if visible

### Visibility rule
Only show a limited number of moons by default. Good cap:
- 1 to 5 visible moons per repo

Less important branches can become:
- minor satellite particles
- implied branch counts
- hidden details shown only on interaction

---

## Commit Activity

Commits should not usually become full moons or planets.

### Default representation
Represent commits as:
- rings
- dust belts
- orbit trail sparks
- light pulses
- comets for notable commits only

### Commit channels
- **Dust density** -> number of commits
- **Particle brightness** -> recency
- **Particle size variance** -> change magnitude variance
- **Trail thickness** -> cadence
- **Burst flares** -> major commits or release events

### Promoted commit events
Only a few commits should become special visible event objects:
- newest commit
- largest recent commit
- release commit
- first commit
- merge into default branch

These can appear as:
- comet streaks
- bright asteroids
- orbit flares
- event beacons

---

## Repo Character

Repo character means the repo's automatically inferred visual personality.

It should not require manual design updates.

### Repo character should be derived from:
- primary language
- topics
- archive/fork status
- branch complexity
- recent activity
- overall size and significance

### Repo character is expressed through:
- biome
- surface style
- major structures
- ambient effects
- motion style

### Important rule
Repo character is a **generated archetype**, not a hand-authored story.

---

## Automatic Planet Archetypes

Use a small set of generated archetypes rather than one-off custom designs.

### 1. Flagship World
Use when:
- high importance
- strong recent activity
- significant size/stars/forks

Visual treatment:
- larger planet
- brighter atmosphere
- one major landmark
- strong label visibility
- stable, elegant moon system

### 2. Active Workshop
Use when:
- frequent recent pushes
- many commits recently
- active branch behavior

Visual treatment:
- moving rings
- mechanical or lit structures
- higher particle motion
- stronger ambient life

### 3. Data Observatory
Use when:
- language/topics suggest analytics, data, ML, research

Visual treatment:
- observatory domes
- crystal arrays
- scan beams
- cool luminous accents

### 4. Web City
Use when:
- frontend/web/UI topics dominate
- JS/TS/HTML/CSS are primary

Visual treatment:
- glowing city-grid motifs
- polished atmosphere
- beacon towers
- smoother silhouettes

### 5. Machine World
Use when:
- tooling, systems, infra, backend, CLI, build-related signals dominate

Visual treatment:
- mechanical ribs
- dock-like structures
- industrial rings
- restrained palette

### 6. Quiet Relic
Use when:
- old repo
- low recent activity
- archived or dormant

Visual treatment:
- dim lighting
- cold atmosphere
- ruin-like structures
- little motion

### 7. Captured Twin
Use when:
- repo is a fork

Visual treatment:
- twin-shell feel
- offset fragments
- split identity cues
- subdued prominence unless also highly active

---

## Automatic Biome Grammar

Biomes should be broad and readable.

### Language to biome examples
- TypeScript / JavaScript -> neon city / luminous panel world
- Python -> observatory / knowledge-world
- C / C++ / Rust / Go -> industrial or mechanical world
- HTML / CSS -> polished light-world
- Shell -> sparse utility outpost world

### Topic modifiers
Use topics to choose hero structures or overlays:
- `game`, `graphics`, `threejs` -> portals, arenas, floating shards
- `api`, `backend`, `server` -> relay towers, terminals, hubs
- `data`, `analytics`, `ml` -> crystal observatories, radar dishes
- `portfolio`, `website`, `ui` -> skylines, beacons, elegant panels
- `cli`, `tool`, `build` -> machine cores, docks, lattice frames

### State modifiers
- archived -> frozen, dim, brittle
- fork -> derived/twin structure
- high recent activity -> brighter atmosphere and more motion
- high branch count -> richer moon system
- protected default branch -> more prominent primary moon

---

## Surface Objects and Structures

Planets should not be plain spheres only. They should feel alive through a few large, readable forms.

### Best rule
Each repo planet should get:
- 1 base biome
- 1 hero structure
- 0 to 2 secondary structures
- 1 ambient effect

This is enough to feel alive without clutter.

### Good structure categories
- towers
- domes
- relay dishes
- panel grids
- crystals
- floating platforms
- mechanical ribs
- skyline silhouettes
- ruins
- ring gates

### Important constraint
Use large iconic objects rather than many small details. The scene should read from a distance.

---

## Ambient Effects

Ambient effects communicate ongoing life without requiring labels.

### Good ambient effects
- thin atmosphere glow
- dust ring
- particle shimmer
- aurora
- faint debris field
- slow scan beam
- electrical pulse
- drifting orbit trail particles

### Data mappings
- recent activity -> glow intensity
- sustained activity -> ring thickness
- bursty development -> flare frequency
- inactivity -> dimmer atmosphere

---

## Color Grammar

Color should be used consistently.

### Best use of color
Use color primarily for category:
- primary language
- repo family
- branch type

### Do not use color for too many meanings
Avoid simultaneously using hue for:
- language
- time
- importance
- state

Pick one main role for hue and use brightness/saturation for the others.

### Suggested strategy
- Hue -> language/category
- Brightness -> recency/activity
- Saturation -> prominence
- Desaturation -> archived/old/inactive

---

## Motion Grammar

Motion should make the system feel alive, not chaotic.

### Good motion assignments
- planet orbit -> slow and calm
- moon orbit -> slightly faster
- atmosphere pulse -> freshness
- particle shimmer -> commit density/activity
- comet pass -> notable event
- beam scan -> data/infra style accent

### Motion restraint
Never make every layer move strongly at once. The user should not feel visually overloaded.

---

## Label Grammar

Labels should be sparse and intentional.

### Always visible labels
- user name
- top-priority repos
- selected repo

### Conditional labels
- selected branch
- notable event
- hovered repo stats

### Hidden by default
- long branch lists
- commit messages in-scene
- labels for low-priority planets or minor moons

### Label priority formula
A simple score can control label visibility:

`labelScore = importance + recency + hoverBoost + selectionBoost`

Only show labels above threshold.

### Text placement
- repo names can float near planets
- branch names should appear mostly on hover
- commit messages belong in tooltip cards or side panels

---

## Interaction Grammar

The visualization should become more informative with interaction.

### Hover repo
On hover:
- slightly enlarge planet
- brighten orbit path
- reveal or emphasize moons
- show summary card

Summary card can show:
- repo name
- description
- language
- last pushed date
- stars/forks
- branch count
- latest notable activity

### Click repo
On click:
- focus camera on repo system
- reveal fuller moon system
- increase detail in rings/commit effects
- open side panel

### Hover moon
On hover:
- show branch name
- highlight branch orbit
- show recent activity snippet

### Click moon
On click:
- isolate branch
- emphasize branch-specific activity field
- optionally reveal recent notable commits

### Hover notable commit event
On hover:
- show message
- date
- additions/deletions
- file count
- GitHub link

---

## Visibility and Density Rules

These rules are essential for keeping the scene readable.

### Default caps
- prominent planets: 8 to 16
- visible moons per repo: 1 to 5
- promoted commit events per repo: 1 to 4
- always-visible labels: 5 to 10
- background low-priority repos: dim or abstracted

### Collapsing strategy
When density rises:
- collapse minor branches
- convert older commits into rings or dust
- hide low-priority labels
- reduce detail for distant systems

### Zoom strategy
At low zoom:
- show planets and major labels

At medium zoom:
- show moons and repo character

At high zoom:
- show promoted commit events and richer metadata

---

## Recommended Mappings Summary

| Visual element | GitHub meaning | Notes |
|---|---|---|
| Sun radius | overall activity score | Keep stable |
| Planet orbit radius | repo recency (`pushed_at`) | Use discrete bands |
| Planet size | repo importance | Weighted score |
| Planet color | primary language | Main hue role |
| Planet glow | recent activity | Use brightness, bloom |
| Planet class | generated archetype | From metadata patterns |
| Planet structures | inferred repo type/topics | 1 hero structure + support |
| Moon count | meaningful branch count | Cap for readability |
| Moon size | branch significance | Main/default larger |
| Moon orbit radius | branch recency | Relative to planet |
| Dust/rings | commit activity density | Default commit representation |
| Comets/flares | notable commits/releases | Only a few |
| Desaturation | inactivity/archive state | Good for old repos |

---

## Recommended Default Aesthetic

### Scene
- deep-space dark background
- subtle star field
- soft bloom
- restrained UI chrome

### Sun
- warm gold-white
- mild pulse
- readable silhouette

### Planets
- strong but not overly saturated color coding
- distinct silhouettes or structures
- subtle atmosphere
- slow orbit

### Moons
- slightly cooler than planet
- simpler than planets
- branch identity through size/tint/brightness

### Commit effects
- mostly abstracted
- elegant rings, dust, and occasional comets
- no constant text clutter

---

## What to Avoid

- rendering every commit as a full body
- too many moons on every repo
- too many always-visible labels
- random colors with no consistent channel meaning
- fast motion everywhere
- tiny unreadable planet details
- unstable object positions that reshuffle every load
- equal visual weight for all repos

---

## Recommended Final System

If you want a strong default implementation, use this:

- **Sun**
  - user identity
  - overall activity

- **Planet**
  - one per repo
  - size = importance
  - orbit ring = repo recency
  - color = language
  - class/biome = inferred archetype
  - structures = inferred topic/type
  - glow = freshness

- **Moon**
  - one per meaningful branch
  - size = branch significance
  - orbit ring = branch recency
  - tint = branch type
  - brightness = activity

- **Commit layer**
  - rings, dust, trails, pulses
  - promoted special events only

- **Interaction**
  - hover for summaries
  - click for drill-down
  - labels only for important or selected objects

This system stays artistic, scalable, and fully generatable from GitHub API data.

---

## Implementation Notes

### Good generation pipeline
1. Fetch user and repo metadata
2. Compute repo importance and recency bands
3. Classify repo archetype from language + topics + state
4. Generate planet body, biome, and structures
5. Fetch branch summaries and create moon systems
6. Fetch recent/notable commits and convert them into ambient effects and special events
7. Apply interaction and label rules

### Best practical rule
The overview should render a portfolio story, not a raw database dump.

That means:
- abstract ordinary activity
- promote meaningful structure
- reward interaction with detail
- keep the scene emotionally readable

---

## One-Sentence Design Standard

**The viewer should immediately feel they are looking at a living solar system of software projects, where repos are distinct worlds, branches are their moons, and commit history appears as atmosphere, rings, and celestial events rather than visual clutter.**
