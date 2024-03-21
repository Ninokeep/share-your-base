export default () => ({
  port: parseInt(process.env.PORT, 10) || 9999,
});
console.log(process.env);
