declare global {
  interface Window {
    ChannelIO?: (method: string, ...args: unknown[]) => void;
    ChannelIOInitialized?: boolean;
  }
}

const PLUGIN_KEY = '2f9158bb-ddb8-40ff-8dcb-0cf2d9ee92c0';

interface ChannelTalkUserProfile {
  memberId: string;
  profile: {
    name: string;
    githubId: string;
    bojId: string | null;
  };
}

export function bootChannelTalk(user?: ChannelTalkUserProfile) {
  window.ChannelIO?.('boot', {
    pluginKey: PLUGIN_KEY,
    ...user,
  });
}

export function shutdownChannelTalk() {
  window.ChannelIO?.('shutdown');
}
