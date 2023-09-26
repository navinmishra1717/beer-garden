import { Dialog, DialogTitle, DialogContent, useMediaQuery, useTheme, TextField, DialogActions, Button, Avatar } from '@mui/material';
import { CustomButton } from '../../components/CustomButton';
import beerImage from '../../assets/images/beer-image.png';

interface AddBeerDialogProps {
    open: boolean;
    onClose: () => void;
}

const AddBeer = (props: AddBeerDialogProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { onClose, open } = props;

    const handleClose = (e?: any) => {
        onClose();
    };

    return (
        <Dialog fullScreen={fullScreen} onClose={handleClose} open={open}>
            <DialogTitle variant="h5">Add a New Beer</DialogTitle>
            <DialogContent>
                <Avatar
                    alt="beer image"
                    src={beerImage}
                    variant="square"
                    sx={{ width: 100, height: 120, border: '1px solid #d4d4d4', borderRadius: '4px' }}
                />
                <TextField id="beer-name" label="Beer name*" variant="outlined" fullWidth margin="dense" />
                <TextField id="genre" label="Genre*" variant="outlined" fullWidth margin="dense" />
                <TextField id="description" label="Description*" multiline rows={4} fullWidth sx={{ marginTop: '4px' }} />
            </DialogContent>
            <DialogActions sx={{ paddingRight: '24px', paddingBottom: '12px' }}>
                <Button onClick={handleClose} sx={{ color: 'gray', marginRight: '24px', textTransform: 'none' }}>
                    Cancel
                </Button>
                <CustomButton onClick={handleClose}>Save</CustomButton>
            </DialogActions>
        </Dialog>
    );
};

export default AddBeer;
