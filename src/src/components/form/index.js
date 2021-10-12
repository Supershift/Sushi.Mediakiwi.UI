export const formMixins = {
  methods: {
    returnValue(field) {
      return (typeof (field) !== 'undefined' && field) ? field : undefined;
    },
  },
};
