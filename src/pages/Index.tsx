import { useNavigate } from 'react-router-dom';
import WelcomeScreen from '@/components/WelcomeScreen';
import { useWelcome } from '@/hooks/useWelcome';
import { useEffect } from 'react';

const Index = () => {
  const { hasSeenWelcome, markWelcomed } = useWelcome();
  const navigate = useNavigate();

  useEffect(() => {
    if (hasSeenWelcome) {
      navigate('/night', { replace: true });
    }
  }, [hasSeenWelcome, navigate]);

  if (hasSeenWelcome) return null;

  return (
    <WelcomeScreen
      onStart={() => {
        markWelcomed();
        navigate('/night');
      }}
    />
  );
};

export default Index;
