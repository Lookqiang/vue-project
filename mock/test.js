export default [
  {
    url: "/api-dev/users",
    methods: "get",
    response: (req) => {
      return {
        code: 0,
        data: [{ name: "tom" }, { name: "jack" }],
      };
    },
  },
];
