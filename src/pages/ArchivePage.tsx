import ArchiveScreen from '@/components/ArchiveScreen';
import BottomNav from '@/components/BottomNav';
import { useDreams } from '@/hooks/useDreams';

const ArchivePage = () => {
  const { dreams, updateDream, deleteDream } = useDreams();

  return (
    <>
      <ArchiveScreen dreams={dreams} onUpdate={updateDream} onDelete={deleteDream} />
      <BottomNav />
    </>
  );
};

export default ArchivePage;
