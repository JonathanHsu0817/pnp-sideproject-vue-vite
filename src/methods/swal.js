import Swal from 'sweetalert2'

const CustomToast = Swal.mixin({
  toast: true,
  position: 'top-right',
  showConfirmButton: false,
  timer: 1500,
  background: '#F6F6F5'
})

export const Toast = (msg, type) => {
  CustomToast.fire({
    icon: type,
    text: msg
  })
}