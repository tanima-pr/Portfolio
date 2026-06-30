# Tanima Garg — Talking-Head Avatar: Generation Guide

This is the same AI-to-code pipeline used by the reference portfolio, adapted for you
(female, Data Analyst / BI Specialist). The frontend hero is already wired to play the
final video at `public/intro.mp4`. You only need to generate the video and drop it in.

Pipeline: **Phase 1** make an identity-consistent avatar image → **Phase 2** animate it into
a talking-head video → **Phase 3** (already done) the Next.js hero plays it.

---

## Phase 1 — Avatar image (Gemini "Nano Banana" / image model)

Upload a clear, front-facing photo of yourself as the identity reference, then use this prompt:

> Create a cinematic 3D stylized portrait using the uploaded image as the exact face and
> identity reference. The generated character must look like the SAME real person from the
> uploaded image — preserve facial structure, hairstyle, skin tone, eye shape, smile, and
> overall identity with high facial consistency. She is a confident, welcoming female data
> analyst.
>
> Scene Setup: A modern data-analytics office at night with warm cinematic lighting. She is
> seated centered at a desk facing the camera, hands calmly resting together on the table.
> Background includes a large monitor showing a clean BI dashboard (KPI cards, line and bar
> charts, a gauge), wooden shelves with a few books and small figurines, soft ambient
> shadows, and desk lamps glowing with warm orange light. Include a laptop on the left and a
> coffee mug on the desk.
>
> Outfit: A tailored dark navy blazer over a black blouse, professional and polished.
> Preserve realistic fabric folds and texture.
>
> Style: Pixar-style modern animated realism mixed with cinematic 3D illustration. Ultra
> detailed skin shading, soft depth of field, subtle bloom lighting, volumetric warm light,
> cozy professional atmosphere, highly polished rendering, sharp facial detail.
>
> Camera & Lighting: Medium shot, centered framing, eye-level angle, symmetrical composition,
> 35mm cinematic lens look. Warm orange practical lamps mixed with subtle cool blue monitor
> light.

After generating: upscale to 4K, clean up any artifacts, remove any watermark, and sharpen
the face before moving to Phase 2.

> Tip: you already have a generated office-style avatar in the repo (`public/cinematic-avatar.png`)
> that fits this description — you can use it directly as the Phase 2 input if you like it.

---

## Phase 2 — Talking-head video (Gemini Video / image-to-video)

Upload the Phase 1 image as the base frame and use this prompt:

> Use the uploaded image as the base frame and create a cinematic animated video. The
> character must remain the SAME person from the uploaded image with high facial consistency
> throughout the animation.
>
> Sequence: She starts seated calmly at the desk, looking directly into the camera. She begins
> speaking naturally with realistic, accurate lip sync and subtle head movement. She gives a
> warm, confident smile, gestures lightly with one hand while explaining, and maintains eye
> contact with the viewer. Natural blinking and breathing throughout. Keep her clearly visible
> and centered — do not zoom in too close or crop her on smaller screens.
>
> Audio Script: "Hi, I'm Tanima Garg — a Data Analyst and BI Specialist based in Ottawa. I turn
> messy datasets into clean metrics, validated reporting, and scalable dashboards. Welcome to
> my portfolio."
>
> Technical Details: 4K cinematic quality, realistic blinking, blazer cloth physics, breathing
> motion, subtle camera micro-movements, natural facial expressions, professional and welcoming
> demeanor, premium cinematic rendering.

After generating: remove any watermark, upscale/enhance to 4K, smooth the motion (frame
interpolation), add gentle cinematic color grading, and export as **MP4 (H.264)**.

---

## Phase 3 — Drop it into the site (already wired)

1. Rename your final video to `intro.mp4`.
2. Replace the file at `public/intro.mp4` in this project.
3. Commit and deploy. The hero (`src/components/HeroSection.tsx`) already:
   - plays it full-screen (autoplay, loop, muted, inline) with a blurred ambient duplicate behind,
   - overlays the Three.js warm-particle layer (`CinematicLayer.tsx`) and cinematic gradients,
   - shows your name, role, "Tap for sound" + mute toggle, and the animated scroll indicator,
   - auto-mutes when you scroll past and snaps to the next section.

No code changes are needed — just swap the file.

### Recommendations for the video
- Keep it 8–15 seconds and loop-friendly (start and end on a similar calm pose).
- Frame as a medium shot so your face stays prominent but uncropped on desktop and mobile.
- Make sure the speech audio is clean — the mute toggle lets visitors hear it.
