:root {
    --hot-pink: #ff69b4;
    --soft-pink: #fbc2eb;
    --dark-pink: #c71585;
}

* { box-sizing: border-box; }

body {
    margin: 0; font-family: 'Poppins', sans-serif;
    color: var(--dark-pink); background: #fffafa;
    overflow-x: hidden; text-align: center;
    cursor: none !important;
}

/* --- BOW CURSOR --- */
#custom-cursor {
    position: fixed; width: 40px; height: 25px;
    pointer-events: none; z-index: 9999;
    opacity: 0; display: flex; align-items: center; justify-content: center;
    transform: translate(-50%, -50%);
}
.bow-left, .bow-right {
    width: 18px; height: 18px;
    background: linear-gradient(45deg, #ff69b4, #ffffff, #ff69b4, #ff1493);
    background-size: 300% 300%;
    animation: shine-bow 3s infinite linear;
    clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
}
.bow-right { transform: rotate(180deg); margin-left: -4px; }
.bow-center { width: 6px; height: 6px; background: white; border-radius: 50%; position: absolute; box-shadow: 0 0 8px white; }

@keyframes shine-bow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* --- TYPING & UI --- */
.typing-cursor { color: var(--hot-pink); font-weight: bold; animation: blink 0.7s infinite; }
@keyframes blink { 50% { opacity: 0; } }

#particle-canvas { position: fixed; top: 0; left: 0; z-index: -1; width: 100vw; height: 100vh; }
.navbar { display: flex; justify-content: center; padding: 15px; background: rgba(255,255,255,0.85); border-bottom: 2px solid var(--soft-pink); position: sticky; top: 0; z-index: 100; backdrop-filter: blur(5px); }
.nav-btn { background: none; border: none; color: var(--hot-pink); font-weight: 600; margin: 0 10px; cursor: none !important; font-size: 0.95rem; }
.nav-btn.active { color: var(--dark-pink); border-bottom: 2px solid var(--dark-pink); }

.container { max-width: 800px; margin: auto; padding: 20px; }
.hero { padding: 60px 0; }
.profile-pic { width: 180px; height: 180px; border-radius: 50%; border: 4px solid var(--hot-pink); object-fit: cover; }
.signature { font-family: 'Playfair Display', serif; font-size: 3.5rem; margin: 10px 0; }

.pink-card { background: white; border-radius: 30px; padding: 40px; border: 1px solid var(--soft-pink); margin-top: 20px; box-shadow: 0 10px 30px rgba(255, 105, 180, 0.1); }
.centered-header { justify-content: center; display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
.soft-divider { border: 0; height: 1px; background: var(--soft-pink); margin: 25px 0; }

.interactive-skill-container { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 20px; }
.skill-tag-advanced { padding: 10px 20px; border: 2px solid var(--soft-pink); border-radius: 12px; position: relative; overflow: hidden; font-weight: 600; }
.skill-tag-advanced::after { content: attr(data-detail); position: absolute; top:0; left:0; width:100%; height:100%; background: var(--hot-pink); color: white; display:flex; align-items:center; justify-content:center; font-size:0.75rem; transform: translateY(100%); transition: 0.3s; }
.skill-tag-advanced:hover::after { transform: translateY(0); }

.project-card-premium { text-align: center; padding: 25px 0; border-bottom: 1px solid var(--soft-pink); }
.project-card-premium:last-child { border-bottom: none; }
.project-meta { font-size: 0.8rem; font-weight: 600; color: var(--hot-pink); letter-spacing: 1px; margin-bottom: 10px; text-transform: uppercase; }

.advanced-form { display: flex; flex-direction: column; gap: 15px; max-width: 450px; margin: auto; }
.form-input { padding: 12px; border-radius: 10px; border: 1px solid var(--soft-pink); font-family: inherit; width: 100%; }
.submit-btn { padding: 12px; background: var(--hot-pink); color: white; border: none; border-radius: 10px; font-weight: bold; cursor: none !important; }
.error-msg { color: var(--dark-pink); font-size: 0.75rem; display: block; margin-top: 5px; }
.hidden-message { display: none; padding: 30px; background: #fff0f6; border-radius: 20px; }
.hidden-message.visible { display: block; }

a, button, input, textarea { cursor: none !important; }
