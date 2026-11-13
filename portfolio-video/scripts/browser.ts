/**
 * Resolves the Chromium executable used by Remotion for rendering.
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export const resolveBrowserExecutable = (): string | null => {
  const fromEnv = process.env.REMOTION_BROWSER_EXECUTABLE;
  if (fromEnv && fs.existsSync(fromEnv)) return fromEnv;

  const root =
    process.env.PLAYWRIGHT_BROWSERS_PATH ||
    (process.platform === 'win32'
      ? path.join(process.env.LOCALAPPDATA || '', 'ms-playwright')
      : process.platform === 'darwin'
        ? path.join(os.homedir(), 'Library', 'Caches', 'ms-playwright')
        : path.join(os.homedir(), '.cache', 'ms-playwright'));
  if (!fs.existsSync(root)) return null;

  // Prefer chromium-1217 (full chrome) which is verified permitted on Windows
  const pinned = ['chromium-1217', 'chromium_headless_shell-1217'];
  for (const dir of pinned) {
    const candidates = [
      path.join(root, dir, 'chrome-win64', 'chrome.exe'),
      path.join(root, dir, 'chrome-headless-shell-win64', 'chrome-headless-shell.exe'),
      path.join(root, dir, 'chrome-linux64', 'chrome'),
      path.join(root, dir, 'chrome-headless-shell-linux64', 'chrome-headless-shell'),
    ];
    for (const c of candidates) {
      if (fs.existsSync(c)) return c;
    }
  }

  return null;
};
