import axios from 'axios'
import handler from '../pages/api/contact'

jest.mock('axios')

describe("handler", () => {
    describe("when API call is successful", () => {
      it("should return post a new contact in SendGrid", async () => {
        // given
        const testContact = [
            { data: {email: "ryan39@lee-young.com", first_name: "Ryan", last_name: "Smith"}}
        ]
        axios.put.mockResolvedValueOnce(testContact)

        // when
        const result = await handler()

        // then
        expect(axios.put).toHaveBeenCalledTimes(1)
        expect(axios.put).toHaveBeenCalledWith([process.env.SENDGRID_URL])
        expect(result).toEqual(testContact)
      });
    });
  
    describe("when API call fails", () => {
      it("should return an error message", () => {
        // ...
      });
    });
  });