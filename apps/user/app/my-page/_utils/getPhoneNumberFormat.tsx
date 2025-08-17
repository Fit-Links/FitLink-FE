export const getFormattedPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");
};
