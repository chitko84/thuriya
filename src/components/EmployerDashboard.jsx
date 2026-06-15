import WorkspaceShell from './WorkspaceShell';
import { WORKSPACES } from '../data/workspaceData';

export default function EmployerDashboard({ setCurrentView }) {
  return <WorkspaceShell workspace={WORKSPACES.employer} setCurrentView={setCurrentView} />;
}
