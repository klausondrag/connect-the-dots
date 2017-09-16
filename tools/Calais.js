const request = require('request');

const token = require('./keys.json').CALAIS_TOKEN;

function submitInfoRequest(inputData) {
    return new Promise((resolve, reject) => {
        request({
                method: 'POST',
                dataType: "text",
                headers: {'X-AG-Access-Token': token, 'Content-Type': 'text/raw', 'OutputFormat': 'application/json'},
                json: inputData,//"IBM is a company in the USA",
                uri: "https://api.thomsonreuters.com/permid/calais?access-token=" + token,

            },
            function (error, response) {
                if (error) {
                    console.error('Error: ', error);
                    reject(error);
                } else {
                    resolve(response.body);
                }
            });
    });
}

submitInfoRequest(getInputData()).then(collectInfo);

function collectInfo(result) {
    // console.log(result);
    let dic = {};
    for (let property in result) {
        if (result.hasOwnProperty(property)) {
            if (property === "doc") continue;
//            console.log("p:", property, result[property]);
            dic[result[property]._type] = "exists";
        }
    }
    console.log(dic);
}


function getInputData() {
    return "North Korea says seeking military 'equilibrium' with U.S.\n" +
        "\n" +
        "SEOUL/UNITED NATIONS (Reuters) - North Korea said on Saturday it aims to reach an “equilibrium” of military force with the United States, which earlier signalled its patience for diplomacy is wearing thin after Pyongyang fired a missile over Japan for the second time in under a month.\n" +
        "\n" +
        "“Our final goal is to establish the equilibrium of real force with the U.S. and make the U.S. rulers dare not talk about military option,” North Korean leader Kim Jong Un was quoted as saying by the state news agency, KCNA.\n" +
        "\n" +
        "Kim was shown beaming as he watched the missile fly from a moving launcher in photos released by the agency, surrounded by several officials.\n" +
        "\n" +
        "“The combat efficiency and reliability of Hwasong-12 were thoroughly verified,” said Kim as quoted by KCNA. Kim added the North’s goal of completing its nuclear force had “nearly reached the terminal”.\n" +
        "\n" +
        "North Korea has launched dozens of missiles under Kim’s leadership as it accelerates a weapons program designed to give it the ability to target the United States with a powerful, nuclear-tipped missile.\n" +
        "\n" +
        "(For a graphic on North Korea's missile and nuclear tests, click tmsnrt.rs/2f3Y8rQ)\n" +
        "\n" +
        "After the latest missile launch on Friday, White House National Security Adviser H.R. McMaster said the United States was fast running out of patience with North Korea’s missile and nuclear programs.\n" +
        "\n" +
        "“We’ve been kicking the can down the road, and we’re out of road,” McMaster told reporters, referring to Pyongyang’s repeated missile tests in defiance of international pressure.\n" +
        "\n" +
        "“For those ... who have been commenting on a lack of a military option, there is a military option,” he said, adding that it would not be the Trump administration’s preferred choice.\n" +
        "\n" +
        "Also on Friday, the U.N. Security Council condemned the “highly provocative” missile launch by North Korea.\n" +
        "\n" +
        "It had already stepped up sanctions against North Korea in response to a nuclear bomb test on Sept. 3, imposing a ban on North Korea’s textile exports and capping its imports of crude oil. \n" +
        "The U.S. ambassador to the United Nations, Nikki Haley, echoed McMaster’s strong rhetoric, even as she said Washington’s preferred resolution to the crisis is through diplomacy and sanctions.\n" +
        "\n" +
        "“What we are seeing is, they are continuing to be provocative, they are continuing to be reckless and at that point there’s not a whole lot the Security Council is going to be able to do from here, when you’ve cut 90 percent of the trade and 30 percent of the oil,” Haley said.\n" +
        "\n" +
        "U.S. President Donald Trump said that he is “more confident than ever that our options in addressing this threat are both effective and overwhelming.” He said at Joint Base Andrews near Washington that North Korea “has once again shown its utter contempt for its neighbours and for the entire world community.”\n" +
        "MISSILE\n" +
        "\n" +
        "North Korea’s latest test missile flew over Hokkaido in northern Japan on Friday and landed in the Pacific about 2,000 km (1,240 miles) to the east, the Japanese government said.\n" +
        "\n" +
        "It travelled about 3,700 km (2,300 miles) in total, according to South Korea’s military, far enough to reach the U.S. Pacific territory of Guam, which the North has threatened before. \n" +
        "\n" +
        "“The range of this test was significant since North Korea demonstrated that it could reach Guam with this missile,” the Union of Concerned Scientists advocacy group said in a statement. However, the accuracy of the missile, still at an early stage of development, was low, it said.\n" +
        "\n" +
        "On Thursday, U.S. Secretary of State Tillerson called on China, Pyongyang’s only ally, and Russia to apply more pressure on North Korea by “taking direct actions of their own.”\n" +
        "\n" +
        "Beijing has pushed back, urging Washington to do more to rein in North Korea.\n" +
        "\n" +
        "“Honestly, I think the United States should be doing .. much more than now, so that there’s real effective international cooperation on this issue,” China’s ambassador to the United States, Cui Tiankai, said on Friday.\n" +
        "\n" +
        "“They should refrain from issuing more threats. They should do more to find effective ways to resume dialogue and negotiation,” he said, while adding that China would never accept North Korea as a nuclear weapons state.\n" +
        "\n" +
        "North Korea staged its sixth and most powerful nuclear bomb test earlier this month and in July tested long-range intercontinental ballistic missiles capable of reaching at least parts of the U.S. mainland.\n" +
        "\n" +
        "Last month, North Korea fired an intermediate range missile that also flew over Hokkaido into the ocean.\n" +
        "\n" +
        "Warning announcements about the latest missile blared in parts of northern Japan, while many residents received alerts on their mobile phones or saw warnings on TV telling them to seek refuge.\n" +
        "\n" +
        "The U.S. military said it had detected a single intermediate range ballistic missile but it did not pose a threat to North America or Guam.\n" +
        "\n" +
        "Global equities investors largely shrugged off the latest missile test by North Korea as shares on Wall Street set new highs on Friday.\n" +
        "DIFFERENCES OVER DIRECT TALKS\n" +
        "\n" +
        "Trump has promised not to allow North Korea to threaten the United States with a nuclear-tipped missile.\n" +
        "\n" +
        "Russia’s U.N. ambassador, Vassily Nebenzia, said the United States needed to begin talks with North Korea, something that Washington has so far ruled out.\n" +
        "\n" +
        "“We called on our U.S. partners and others to implement political and diplomatic solutions that are provided for in the resolution,” Nebenzia told reporters after the Security Council meeting. “Without implementing this, we also will consider it as a non-compliance with the resolution.”\n" +
        "\n" +
        "Asked about the prospect for direct talks, a White House spokesman said, “As the president and his national security team have repeatedly said, now is not the time to talk to North Korea.”\n" +
        "\n" +
        "South Korean President Moon Jae-in also said dialogue with the North was impossible at this point. He ordered officials to analyse and prepare for possible new North Korean threats, including electromagnetic pulse and biochemical attacks.\n" +
        "\n" +
        "The United States and South Korea are technically still at war with North Korea because the 1950-53 Korean conflict ended with a truce and not a peace treaty. The North accuses the United States, which has 28,500 troops in South Korea, of planning to invade and regularly threatens to destroy it and its Asian allies.";
}