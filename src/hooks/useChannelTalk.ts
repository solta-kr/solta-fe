import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bootChannelTalk, shutdownChannelTalk } from '../utils/channelTalk';

export function useChannelTalk() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (user) {
      bootChannelTalk({
        memberId: String(user.id),
        profile: {
          name: user.name,
          githubId: user.githubId,
          bojId: user.bojId,
        },
      });
    } else {
      bootChannelTalk();
    }

    return shutdownChannelTalk;
  }, [user?.id, isLoading]);
}
