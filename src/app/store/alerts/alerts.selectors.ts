import { Alert } from 'src/app/interfaces/alerts';

export const selectAlert = (state: { alerts: Alert }) => state.alerts;

