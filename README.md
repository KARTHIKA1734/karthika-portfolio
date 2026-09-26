# Karthika K — Portfolio (React Native)

Expo + Expo Router + TypeScript + NativeWind + Reanimated. One codebase
for web, iOS, and Android, built to match the "3D Creator" spec's look:
gradient hero heading, animated avatar slot, scroll-linked reveals,
numbered Skills list, scale-on-scroll Project cards.

## Setup

```bash
npm install
npx expo start        # press w for web, i for iOS, a for Android
```

## What's different from a plain web build (and why)

- **Avatar interaction**: on web, the avatar tracks your mouse like the
  original "Magnet" effect. On a phone, there's no cursor, so it responds
  to touch instead — press it and it scales up and lifts slightly. Both
  live in `components/MagnetOrPress.tsx`.
- **About text**: the web spec reveals text character-by-character as
  you scroll. That's expensive to do per-letter in React Native's
  rendering model, so this ships a staged fade-and-rise instead — same
  "text appears as you get there" feeling, far cheaper to run on a phone.
- **Project card stacking**: driven by `react-native-reanimated`'s
  scroll interpolation (`components/ProjectsSection.tsx`), which behaves
  the same on web, iOS, and Android — no `position: sticky` needed.

## Adding your photo

In `components/HeroSection.tsx`, replace the placeholder `View` (person
icon + "your photo here") with an `<Image source={...} />` once you have
a photo to use.

## Adding real project screenshots

Same idea in `components/ProjectsSection.tsx` — swap the icon block for
an `<Image>` per project once you have real screenshots.

## Structure

```
content/profile.ts       All resume-derived content — edit this to update text
components/
  GradientText.tsx        MaskedView + LinearGradient text fill
  MagnetOrPress.tsx        Platform-aware hover/press response
  FadeIn.tsx               Staged reveal used throughout
  HeroSection.tsx, AboutSection.tsx, SkillsSection.tsx, ProjectsSection.tsx
  ContactButton.tsx, LiveProjectButton.tsx
app/
  _layout.tsx              Loads Kanit fonts, dark theme
  index.tsx                Assembles the whole page, owns the scroll value
```

## Publishing the web build

```bash
npx expo export --platform web
```
