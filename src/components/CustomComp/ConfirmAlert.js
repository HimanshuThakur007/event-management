import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export const showConfirmationAlert = (deleteMasterData,code) => {
    MySwal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        showCancelButton: true,
        confirmButtonColor: '#00ff00',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonColor: '#ff0000',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            if (typeof deleteMasterData === 'function') {
                deleteMasterData(code);
                console.log(code,'sweeetAlert')
            } else {
                console.error('deleteMasterData is not a function');
                console.log(code,'sweeetAlert')
            }
            MySwal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                className: "btn btn-success",
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'btn btn-success',
                },
            });
        } else {
            MySwal.close();
        }

    });
};