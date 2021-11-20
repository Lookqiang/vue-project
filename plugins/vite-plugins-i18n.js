export default {
  transform(code, id) {
    console.log(code, id);
    if (/vue&type=i18n/.test(id)) {
      return `export default Comp =>{
        Comp.i18n = ${code}
      }`;
    }
    return null;
  },
};
