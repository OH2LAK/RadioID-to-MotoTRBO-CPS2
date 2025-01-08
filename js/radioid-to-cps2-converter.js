document.getElementById('download-btn').addEventListener('click', function() {
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML = ''; // Clear previous messages
    
    const downloadURL = 'https://radioid.net/static/user.csv';
    const mccInput = document.getElementById('mccInput').value.trim();
    
    if (!mccInput.match(/^1$|^\d{3}$/)) {
        messageContainer.innerHTML = `
            <div class="message error">
                Error: Please enter a valid 3-digit MCC code
            </div>`;
        return;
    }
    
    const mcc = mccInput.match(/^1$|^\d{3}$/) ? mccInput : '244';

    fetch(downloadURL)
        .then(response => response.text())
        .then(text => {
            const rows = text.split('\n');
            const headers = rows[0].split(',');

            const idIndex = headers.indexOf('RADIO_ID');
            const callIndex = headers.indexOf('CALLSIGN');
            const firstNameIndex = headers.indexOf('FIRST_NAME');
            
            const processedRows = rows
                .slice(1)
                .map(row => row.split(','))
                .filter(cols => cols[idIndex].startsWith(mcc))
                .map(cols => [
                    `${cols[callIndex]} ${cols[firstNameIndex]}`,  // ContactName
                    'False',                                      // Delete_Contact
                    '',                                           // Rename_Contact
                    '',                                           // Comments
                    'False',                                      // Delete_FiveToneCalls
                    '',                                           // FiveToneCalls-S5CLDLL_5TTELEGRAM
                    '',                                           // FiveToneCalls-S5CLDLL_5TCALLADD
                    'False',                                      // Delete_MDCCalls
                    '',                                           // MDCCalls-AU_CALLLSTID
                    '',                                           // MDCCalls-AU_MDCSYS
                    '',                                           // MDCCalls-AU_RVRTPERS_Zone
                    '',                                           // MDCCalls-AU_RVRTPERS
                    '',                                           // MDCCalls-AU_SPTPLDPL
                    '',                                           // MDCCalls-AU_CALLTYPE
                    'False',                                      // Delete_QuikCallIICalls
                    '',                                           // QuikCallIICalls-QU_QCIISYS
                    '',                                           // QuikCallIICalls-QU_RVRTPERS_Zone
                    '',                                           // QuikCallIICalls-QU_RVRTPERS
                    '',                                           // QuikCallIICalls-QU_CALLFORMAT
                    '',                                           // QuikCallIICalls-QU_TONEATXFRE
                    '',                                           // QuikCallIICalls-QU_CODEA
                    '',                                           // QuikCallIICalls-QU_TONEBTXFRE
                    '',                                           // QuikCallIICalls-QU_CODEB
                    '',                                           // QuikCallIICalls-QU_STRIPPLDPL
                    'False',                                      // Delete_DigitalCalls
                    cols[idIndex],                                // DigitalCalls-DU_CALLLSTID
                    'Regular',                                    // DigitalCalls-DU_ROUTETYPE
                    'False',                                      // DigitalCalls-DU_CALLPRCDTNEN
                    'No Style',                                   // DigitalCalls-DU_RINGTYPE
                    'Repetitive',                                 // DigitalCalls-DU_TXTMSGALTTNTP
                    'Private Call',                               // DigitalCalls-DU_CALLTYPE
                    'False',                                      // DigitalCalls-DU_OVCMCALL
                    'False',                                      // Delete_CapacityPlusCalls
                    '',                                           // CapacityPlusCalls-CAPPLUSUCL_CALLLSTID
                    '',                                           // CapacityPlusCalls-CAPPLUSUCL_ROUTETYPE
                    '',                                           // CapacityPlusCalls-CAPPLUSUCL_CALLPRCDTNEN
                    '',                                           // CapacityPlusCalls-CAPPLUSUCL_RINGTYPE
                    '',                                           // CapacityPlusCalls-CAPPLUSUCL_TXTMSGALTTNTP
                    '',                                           // CapacityPlusCalls-CAPPLUSUCL_CALLTYPE
                    'False',                                      // Delete_PhoneCalls
                    '',                                           // PhoneCalls-PHNUCLELL_CALLID
                    ''                                            // PhoneCalls-PHNUCLELL_RINGTYPE
                ]);

            const filteredRows = processedRows.filter(cols => cols[idIndex].startsWith(mcc));
    
            if (processedRows.length === 0) {
                messageContainer.innerHTML = `
                    <div class="message error">
                    No contacts found for MCC code ${mcc}
                    </div>`;
                return;
            }

            const destinationCsv = [
                'ContactName,Delete_Contact,Rename_Contact,Comments,Delete_FiveToneCalls,FiveToneCalls-S5CLDLL_5TTELEGRAM,FiveToneCalls-S5CLDLL_5TCALLADD,Delete_MDCCalls,MDCCalls-AU_CALLLSTID,MDCCalls-AU_MDCSYS,MDCCalls-AU_RVRTPERS_Zone,MDCCalls-AU_RVRTPERS,MDCCalls-AU_SPTPLDPL,MDCCalls-AU_CALLTYPE,Delete_QuikCallIICalls,QuikCallIICalls-QU_QCIISYS,QuikCallIICalls-QU_RVRTPERS_Zone,QuikCallIICalls-QU_RVRTPERS,QuikCallIICalls-QU_CALLFORMAT,QuikCallIICalls-QU_TONEATXFRE,QuikCallIICalls-QU_CODEA,QuikCallIICalls-QU_TONEBTXFRE,QuikCallIICalls-QU_CODEB,QuikCallIICalls-QU_STRIPPLDPL,Delete_DigitalCalls,DigitalCalls-DU_CALLLSTID,DigitalCalls-DU_ROUTETYPE,DigitalCalls-DU_CALLPRCDTNEN,DigitalCalls-DU_RINGTYPE,DigitalCalls-DU_TXTMSGALTTNTP,DigitalCalls-DU_CALLTYPE,DigitalCalls-DU_OVCMCALL,Delete_CapacityPlusCalls,CapacityPlusCalls-CAPPLUSUCL_CALLLSTID,CapacityPlusCalls-CAPPLUSUCL_ROUTETYPE,CapacityPlusCalls-CAPPLUSUCL_CALLPRCDTNEN,CapacityPlusCalls-CAPPLUSUCL_RINGTYPE,CapacityPlusCalls-CAPPLUSUCL_TXTMSGALTTNTP,CapacityPlusCalls-CAPPLUSUCL_CALLTYPE,Delete_PhoneCalls,PhoneCalls-PHNUCLELL_CALLID,PhoneCalls-PHNUCLELL_RINGTYPE',
                'Contact Name,Delete_Contact,Rename_Contact,Comments,Delete_FiveToneCalls,Five Tone Calls - Telegram,Five Tone Calls - Address,Delete_MDCCalls,MDC Calls - Call ID (Hex),MDC Calls - MDC System,MDC Calls - Revert Channel Zone,MDC Calls - Revert Channel,MDC Calls - Strip TPL/DPL,MDC Calls - Call Type,Delete_QuikCallIICalls,Quik CallII Calls - Quik-Call II System,Quik CallII Calls - Revert Channel Zone,Quik CallII Calls - Revert Channel,Quik CallII Calls - Call Format,Quik CallII Calls - Tone A Freq (Hz),Quik CallII Calls - Tone A Code,Quik CallII Calls - Tone B Freq (Hz),Quik CallII Calls - Tone B Code,Quik CallII Calls - Strip TPL/DPL,Delete_DigitalCalls,Digital Calls - Call ID,Digital Calls - Route Type,Digital Calls - Call Receive Tone,Digital Calls - Ring Style,Digital Calls - Text Message Alert Tone,Digital Calls - Call Type,Digital Calls - DU_OVCMCALL,Delete_CapacityPlusCalls,Capacity Plus Calls - Call ID,Capacity Plus Calls - Route Type,Capacity Plus Calls - Call Receive Tone,Capacity Plus Calls - Ring Style,Capacity Plus Calls - Text Message Alert Tone,Capacity Plus Calls - Call Type,Delete_PhoneCalls,Phone Calls - Number,Phone Calls - Ring Type',
                ...processedRows.map(row => row.join(','))
            ].join('\n');

            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().replace('T', ' ').substring(0, 16);
            const filename = `CPS2 ${mcc}-contacts (${formattedDate}).csv`;

            const blob = new Blob([destinationCsv], { type: 'text/csv' });
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(downloadURL);

            const warningMessage = processedRows.length > 1000 
                ? '<br><span style="color: #ff0000">Warning: File contains more than 1000 contacts and wont fit to the radio. Please edit the file before importing to CPS2!</span>' 
                : '';

            messageContainer.innerHTML = `
                <div class="message success">
                    File "${filename}" has been created with ${processedRows.length} contacts and sent to your browser!${warningMessage}
                </div>`;
        })
        .catch(error => {
            messageContainer.innerHTML = `
                <div class="message error">
                Error processing the CSV: ${error.message}
                </div>`;
        });
});