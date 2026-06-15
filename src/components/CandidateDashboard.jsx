import WorkspaceShell from './WorkspaceShell';
import { WORKSPACES } from '../data/workspaceData';

export default function CandidateDashboard({ setCurrentView }) {
  return <WorkspaceShell workspace={WORKSPACES.candidate} setCurrentView={setCurrentView} />;
}
