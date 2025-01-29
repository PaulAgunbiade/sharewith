import {Axios} from "axios";
import {z} from "zod";

export const getClinicDataRequestSchema = z.object({
  data: z.object({
    fields: z.array(z.string()),
  }),
});
export type GetClinicDataRequestPayload = z.infer<
  typeof getClinicDataRequestSchema
>;

//TODO: Better type saftey to match fields give in request
// export const getClinicDataResponseSchema = z.object({
//   data: z.object({}),
// });
// export type GetClinicDataResponsePayload = z.infer<
//   typeof getClinicDataResponseSchema
// >;

export async function getClinicData(
  requestPayload: GetClinicDataRequestPayload,
  priavteAxiosInstance: Axios
) {
  getClinicDataRequestSchema.parse(requestPayload);
  const response = await priavteAxiosInstance.get("/clinic", {
    params: {fields: requestPayload.data.fields},
  });
  return response.data;
}
