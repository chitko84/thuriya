import WorkspaceShell from './WorkspaceShell';
import { WORKSPACES } from '../data/workspaceData';

export default function UniversityConsole({ setCurrentView }) {
  return <WorkspaceShell workspace={WORKSPACES.university} setCurrentView={setCurrentView} />;
}
