import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


class ConfirmationService {
    public showConfirmation = (message: string, onConfirm: () => void) => {
        confirmAlert({
          title: 'Confirmation',
          message: message,
          buttons: [
            {
              label: 'Confirm',
              onClick: onConfirm
            },
            {
              label: 'Cancel',
              onClick: () => {} // Do nothing on cancel
            }
          ]
        });
      };
      
}

const confirmationService = new ConfirmationService();

export default confirmationService;