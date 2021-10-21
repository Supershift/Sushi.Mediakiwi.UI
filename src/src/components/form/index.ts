export const useCheckUndefined = {
  methods: {
    undefinedCheck(field: string): string {
      return (typeof (field) !== "undefined" && field) ? field : "";
    },
  },
};

export enum ExpressionType {
  Full = 0,
  Left = 1,
  Right = 2,
  Alternating = 3,
}
