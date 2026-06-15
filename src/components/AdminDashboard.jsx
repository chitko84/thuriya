import WorkspaceShell from './WorkspaceShell';
import { WORKSPACES } from '../data/workspaceData';

export default function AdminDashboard({ setCurrentView }) {
  return <WorkspaceShell workspace={WORKSPACES.admin} setCurrentView={setCurrentView} />;
}
