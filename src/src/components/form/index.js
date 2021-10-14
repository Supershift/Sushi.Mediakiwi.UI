const useCheckUndefined = {
  created() {
    this.undefinedCheck();
  },
  methods: {
    undefinedCheck(field) {
      return (typeof (field) !== 'undefined' && field) ? field : undefined;
    },
  },
};

export default useCheckUndefined;
