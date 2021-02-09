import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide
} from '@material-ui/core';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogMessageConfirme({
  onConfirm,
  open,
  setOpen,
  title,
  description,
  success,
  cancel
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {description}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        {onConfirm ? (
          <Button
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            color="primary"
          >
            {success || 'Confirma'}
          </Button>
        ) : (
          <div />
        )}
        <Button onClick={() => setOpen(false)} color="secondary">
          {cancel || 'Cancelar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
