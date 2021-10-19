const useCheckUndefined = {
  methods: {
    undefinedCheck(field: string): string {
      return (typeof (field) !== "undefined" && field) ? field : "";
    },
  },
};

export default useCheckUndefined;
