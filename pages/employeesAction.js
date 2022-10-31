
import React from "react";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import AddEmployees from './addEmployees';
import styles from "../styles/EmployeeList.module.css";
import {Button} from 'evergreen-ui'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
    
          <CloseIcon />
     
      ) : null}
    </DialogTitle>
  );
};
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


 function employeesAction() {
 
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  

  return (
  
      <div>
     <br/>
      <Button 
      className={styles.update}
      appearance="primary" 
      onClick={handleClickOpen}>
        Add Employees

      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent>
           <AddEmployees/>
        </DialogContent>
        
        <DialogActions>
          
          <Button 
           className={styles.update}
           appearance="primary" 
          onClick={handleClose}>
            cancel
          </Button>
        </DialogActions>
        
      </BootstrapDialog>
      
    </div>
   
   
  );
}


export default employeesAction;