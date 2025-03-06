import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { queryHuggingFace } from '../../utils/huggingface';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function SummaryModal({ content }) {
    const [open, setOpen] = useState(false);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const handleOpen = async () => {
        setOpen(true)
        setLoading(true)
        await handleSummarize()
        setLoading(false)
    };
    const handleClose = () => {
        setOpen(false)

    };



    const handleSummarize = async () => {
        const response = await queryHuggingFace("facebook/bart-large-cnn", content);
        if (response && response[0]?.summary_text) {
            setSummary(response[0].summary_text);

        }

    };

    return (
        <div>
            <Button onClick={handleOpen}>Summarize</Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
                data-testid="summary-modal"
            >
                <Box sx={style}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h5" paddingBottom={2} >
                                {'Notes Summary'}
                            </Typography>
                            <Typography variant="body1" >
                                {summary}
                            </Typography>
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
}
