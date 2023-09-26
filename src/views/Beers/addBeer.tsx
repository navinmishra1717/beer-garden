import { Dialog, DialogTitle, Typography, useMediaQuery, useTheme } from '@mui/material';

interface AddBeerDialogProps {
    open: boolean;
    onClose: (value: string) => void;
}

const AddBeer = (props: AddBeerDialogProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { onClose, open } = props;

    const handleClose = (value: string) => {
        onClose(value);
    };

    return (
        <Dialog fullScreen={fullScreen} onClose={handleClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            <Typography>This is modal</Typography>
        </Dialog>
    );
};

export default AddBeer;
