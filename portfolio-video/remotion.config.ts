import { Config } from '@remotion/cli/config';

// Website clips, stills and audio live in ./assets and are referenced with staticFile().
Config.setPublicDir('./assets');
Config.setVideoImageFormat('png');
Config.setPixelFormat('yuv420p');
Config.setCodec('h264');
Config.setCrf(14);
Config.setConcurrency(1);
Config.setChromiumOpenGlRenderer('angle');
Config.setOverwriteOutput(true);

