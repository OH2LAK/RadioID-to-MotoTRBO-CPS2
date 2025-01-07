# A webscript to create a MotoTRBO CPS2 contact list from RadioID CSV dump
## What does this script do:
1. The script fetches the User DMR-ID dumpfile https://radioid.net/static/user.csv from RadioID. The dump contains all registered DMR-ID's for all users worldwide.
2. The script filters out the DMR-ID numbers with the MCC which has been requested for the destination contact list CSV file
3. Fields `RADIO_ID`, `CALLSIGN` and `FIRST_NAME` from the filtered source list are used to form the destination CSV file.
4. The destination CSV file field `ContactName`is populated with source fields `CALLSIGN`and `FIRST_NAME` and the field `DigitalCalls-DU_CALLLSTID` is populated from source field `RADIO_ID` accordingly.
5. The MotoTRBO CPS2 Contact list CSV-file has total of 42 fields per contact. The remaining 39 fields are populated with default or empty data per an export example of contacts from the CPS2.

## Usage
1. Browse to https://oh2lak.radio/RadioID-to-CPS2/ or install the webscript to your own internet-connected webserver
2. Select the MCC of which you wish to download the contacts for. Default on my server is 244 (Finland)
3. Click 'Download CPS2 contact list' button and the file will be automatically downloaded.

>[!NOTE]
>If a non-existent MCC or an MCC with no contacts has been entered, an error message will indicate the reason for no file downloaded.

> [!WARNING]
> If the downloaded contact file includes more that 1000 contacts, it won't fit to the radio. Newest MotoTRBO radios have a limit of 1000 total contacts including group calls, so the maximum amount of individual contacts vary depending on how many talk groups you have in your radio.
> Use the editor of your selection to cut away unnecessary contacts from the downloaded contact file 

4. Import the downloaded CPS2-contactfile with the import-feature of MotoTRBO CPS2 (Contacts -> [three dots -menu] -> Import)

![Where to import contact-CSV -file to MotoTRBO CPS2](https://github.com/user-attachments/assets/c1ab112e-0e63-4053-9a9f-4ce5e012ebb8)

>[!NOTE]
>Imported contacts do not overwrite or remove existing contacts. Imported contacts are simply amended to the list of exiting contacts. There are tricks to remove and rename contacts through the import file, maybe I'll make a tool to handle those too!

5. Buy me coffee for a good job!

[![Link to Erik Finskas Buymeacoffee.com page](https://github.com/user-attachments/assets/d1c9cd92-d4f9-4b87-a142-93a200ad88ea)](https://buymeacoffee.com/erikfinskas)
