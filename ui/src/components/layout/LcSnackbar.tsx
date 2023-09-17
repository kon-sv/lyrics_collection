import * as React from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/S';
import IconButton from '@mui/joy/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';

export default function LcSnackbar({action, message}: {action: () => void, message: any}) {

  let [m, setM] = React.useState("")

  React.useEffect(() => {
    console.log(message)
    setM(message)
    setTimeout(() => {
      setM("")
    }, 2000)
  }, [message]);


  return <>
    { m != "" ?
    <div className={clsx("absolute top-3 right-8 h-[70px] w-[200px]")}>
      <div className={clsx("bg-cyan-900 ring-cyan-600 ring-2 rounded")}>
        <div className={clsx("px-4 py-1 font-semibold")}>
          {message}
        </div>
      </div>
    </div>
    : null
    }
  </>

  // const [open, setOpen] = React.useState(false);
  //
  // const handleClick = () => {
  //   setOpen(true);
  // };
  //
  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //
  //   setOpen(false);
  // };
  //
  // const action = (
  //   <React.Fragment>
  //     <Button color="secondary" size="small" onClick={handleClose}>
  //       UNDO
  //     </Button>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={handleClose}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </React.Fragment>
  // );

  // return (
  //   <div>
  //     <Button onClick={handleClick}>Open simple snackbar</Button>
  //     <Snackbar
  //       open={open}
  //       autoHideDuration={6000}
  //       onClose={handleClose}
  //       message="Note archived"
  //       action={action}
  //     />
  //   </div>
  // );
}
