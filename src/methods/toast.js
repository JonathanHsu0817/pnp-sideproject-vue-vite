import Swal from 'sweetalert2'

const CustomToast = Swal.mixin({
  toast: true,
  position: 'top-right',
  showConfirmButton: false,
  timer: 1500,
  background: '$#FCE9E4'
})

export const Toast = (msg, type) => {
  CustomToast.fire({
    icon: type,
    text: msg
  })
}