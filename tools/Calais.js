const request = require('request');

const token = require('./keys.json').CALAIS_TOKEN;

function submitInfoRequest(inputData) {
    return new Promise((resolve, reject) => {
        request({
                method: 'POST',
                dataType: "text",
                headers: {'X-AG-Access-Token': token, 'Content-Type': 'text/raw', 'OutputFormat': 'application/json'},
                json: inputData,
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

function computePropertyScore(dic1_p, dic2_p) {
    let distance_to_be_rooted = 0.0;
    for (let i = 0; i < dic1_p.length; i++) {
        for (let j = 0; j < dic2_p.length; j++) {
            if (dic1_p[i][0] === dic2_p[j][0]) {
                let x = (dic1_p[i][1] - dic2_p[j][1]);
                distance_to_be_rooted += x * x;
            }
        }
    }

    return Math.sqrt(distance_to_be_rooted);
}

function computeScore(dic1, dic2) {
    console.log("dic1:", dic1);
    console.log("dic2:", dic2);

    let scores = [];

    for (let d in dic1) {
        if (dic1.hasOwnProperty(d) && dic2.hasOwnProperty(d)) {
            scores.push(computePropertyScore(dic1[d], dic2[d]));
        }
    }
    return 1.0 - scores.reduce((s1, s2) => s1 + s2) / scores.length;
}

submitInfoRequest(getInputData1()).then(collectInfo)
    .then(dic1 => {
        submitInfoRequest(getInputData2()).then(collectInfo)
            .then(dic2 => computeScore(dic1, dic2))
            .then(s => console.log(s))
    });

function collectInfo(result) {
    let dic = {};
    for (let p in result) {
        if (result.hasOwnProperty(p)) {
            if (p === "doc" || !result[p]._type) continue;
            let {name, relevance} = result[p];
            if (name && relevance) {
                if (!dic[result[p]._type]) dic[result[p]._type] = [];
                dic[result[p]._type].push([name, relevance]);
            }
        }
    }
    return dic;
}


function getInputData1() {
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

function getInputData2() {
    return "HAVING A BLASTKim Jong-un rubs his hands in glee as he unleashes ballistic missile that could destroy Guam and vows ‘equilibrium of real force with US’\n" +
        "\n" +
        "The brash rogue state claimed American is now in 'mortal fear' after proving it has the military power to strike US territory.\n" +
        "TRIGGER-HAPPY Kim Jong-un rubbed his hands in glee as he unleashed a ballistic missile that could strike Guam.\n" +
        "\n" +
        "The brash North Korean tyrant boasted of his \"shining victory\" and vowed that his final goal is \"equilibrium of real force with US\".\n" +
        "He claimed the States are in \"mortal fear\" after the rogue state fired an intercontinental over Japan this morning - proving they CAN hit the US territory.\n" +
        "\n" +
        "The rocket, believed to be a intercontinental ballistic missile (ICBM), flew for about 19 minutes over a distance of about 2,300 miles - far enough to reach the U.S. Pacific territory of Guam, which is 2,100 miles from North Korea.\n" +
        "\n" +
        "Japan warned its residents to \"duck and cover\" as furious Americans vowed an \"ironclad\" response to Pyongyang's latest military test.\n" +
        "\n" +
        "Now in a typically unrepentant statement from North Korea, they bragged their military display was met with \"admiration\", not condemnation.\n" +
        "Pictures released today by the country's Korean Central News Agency show Kim and officials watching and then celebrating the launch of a Hwasong-12 missile.\n" +
        "\n" +
        "\"People from across the world have expressed admiration at the DPRK's bold pluck and great potentiality,\" claimed the NK state media.\n" +
        "\n" +
        "\"Media of many countries are zealously reporting about the DPRK's nuclear attack capability, which has reached the high level able to ensure the accuracy and freely control the striking power according to targeted object and purpose, and about the failure of the US policy toward the DPRK.\n" +
        "\"The DPRK has won a shining victory in the standoff with the U.S.\n" +
        "\n" +
        "\"Now no one can disregard the immense national strength and potentiality of the DPRK and deny its strategic position as a responsible nuclear weapons state with a great clout.\n" +
        "\n" +
        "\"The U.S. has tightened sanctions and blockade by mobilising its vassal forces to stifle the DPRK. But it could not check the advance of the army and people of the DPRK.\n" +
        "\n" +
        "\"The U.S., styling itself as a superpower while boasting of its strength before other big powers, is in mortal fear of the DPRK.\"\n" +
        "\n" +
        "Japan's defence minister Itsunori Onodera said he believed North Korea has the U.S. territory in mind with its recent nuclear missile tests. as he warned that \"similar actions (by the North) would continue\".\n" +
        "\n" +
        "\"We cannot assume North Korea's intention, but given what it has said, I think it has Guam in mind,\" he said.\n" +
        "\n" +
        "Pyongyang has constantly threatened to hit the US Pacific territory - home to the Andersen Air Force Base - with missiles bringing \"enveloping fire\".\n" +
        "\n" +
        "Physicist David Wright, of the Union of Concerned Scientists, said today: \"North Korea demonstrated that it could reach Guam with this missile, although the payload the missile was carrying is not known\" and its accuracy was in doubt.\"\n" +
        "\n" +
        "The US Pacific Command confirmed the launch was an intermediate range ballistic missile (IRBM) but insisted it posed no threat to Guam or to the American mainland.\n" +
        "\n" +
        "However, officials reiterated that Washington's commitments to the defence of its territories and allies remained \"ironclad”.\n" +
        "\n" +
        "South Korea's Defense Ministry said the country's military conducted a live-fire drill of a Hyunmoo-2 ballistic missile in response to the North's latest aggressive move.\n" +
        "Kim and his defiant state's act provoked wide-scale condemnation from Western powers as it was announced the UN Security Council would hold an emergency meeting today.\n" +
        "\n" +
        "The missile flew over northern Japan and smashed down in the  Sea of Japan about 2,000km to the east off Hokkaido.\n" +
        "\n" +
        "Seoul said it was the 19th launch of a ballistic missile by North Korea this year.\n" +
        "The missile was the second to be sent over Japan by the hermit state in less than a month and the 19th test this year, according to Seoul.\n" +
        "\n" +
        "After the launch, the South Korean military also carried out a live tank fire exercise along the Demilitarized Zone (DMZ) in Paju.\n" +
        "\n" +
        "South Korea’s president has said the country possesses the power to destroy its northern neighbour “beyond recovery.\"\n" +
        "\n" +
        "Moon Jae-in also said dialogue with the Kim was “impossible in a situation like this”, South Korea’s Yonhap news agency reported.\n" +
        "\n" +
        "Mr Moon said: “In case North Korea undertakes provocations against us or our ally, we have the power to destroy [them] beyond recovery.\n" +
        "\n" +
        "“Dialogue is impossible in a situation like this. International sanctions and pressure will further tighten to force North Korea to choose no other option but to step forward on the path to genuine dialogue.”\n" +
        "He added the country's military had been ordered \"to prepare a stern measure that can effectively counter North Korea's increasing nuclear and military threats.\"\n" +
        "\n" +
        "Moon also promised to closely analyse and prepare for new possible North Korean threats, like EMP (electro-magnetic pulse) and biochemical attacks.\n" +
        "\n" +
        "Japanese Prime Minister Shinzo Abe and U.S. Defense Secretary Jim Mattis both called the ICBM launch a reckless act.\n" +
        "\n" +
        "Mr Abe said: “The international community should unite against such conduct to send a clear message … The recent sanctions and resolutions must be fully complied with and implemented. That is now ever more clear.\n" +
        "\n" +
        "“If North Korea continues to walk this road, there will be no bright future. We need to get North Korea to understand that.\"\n" +
        "But Mr Suga said there's no evidence of any missile fragments landing on Japanese territory.\n" +
        "\n" +
        "The US military said the missile did not pose a threat to its territory of Guam.\n" +
        "U.S. Defense Secretary Jim Mattis branded North Korea 'reckless' after the launch.\n" +
        "\n" +
        "Asked about a possible American military response, Mattis said, \"I don't want to talk on that yet.\" after he said that the missile launch had \"put millions of Japanese in duck and cover.\"\n" +
        "\n" +
        "Foreign Secretary Boris Johnson said: \"North Korea has conducted yet another illegal missile launch.\n" +
        "\n" +
        "\"The UK and the international community have condemned the aggressive and illegal actions of the North Korean regime, and the succession of missile and nuclear tests.\n" +
        "\n" +
        "\"We stand firmly by Japan and our other international partners.\n" +
        "\n" +
        "\"We are working to mobilise world opinion with the aim of achieving a diplomatic solution to the situation on the Korean peninsula.\n" +
        "\n" +
        "\"This week the most stringent UN sanctions regime placed on any nation in the 21st century was imposed on North Korea, after being unanimously agreed at the UN Security Council.\n" +
        "\n" +
        "\"These measures now need to be robustly enforced. We urge all states to play their part in changing the course North Korea is taking.\"\n" +
        "\n" +
        "Australian Prime Minister Malcolm Turnbull was also quick to condemn the launch.\n" +
        "\n" +
        "\"This is another dangerous, reckless, criminal act by the North Korean regime, threatening the stability of the region and the world and we condemn it, utterly,\" he said in an interview with Sky News.\n" +
        "\n" +
        "\"This is a sign, I believe, of their frustration at the increased sanctions on North Korea, recently imposed by the Security Council. It's a sign that the sanctions are working.\"\n" +
        "\n" +
        "Mr Turnbull later fronted the media, where he addressed whether further sanctions would increase the risk of attack on Japan.\n" +
        "\n" +
        "\"I don't accept that. The critical thing is to continue to apply economic pressure on North Korea to bring the regime to it senses,\" he said.\n" +
        "\n" +
        "\"Nobody wants to see a war on the Korean Peninsula. If Kim Jong-un were to start a war, to attack the United States or one of its allies, he would be signing a suicide note.\n" +
        "\"That would be the end for his government and thousands and thousands of people would die. It would be a catastrophe and that is why it is vitally important to maintain this economic pressure on North Korea.\"\n" +
        "\n" +
        "NATO Secretary General Jens Stoltenberg said the launch was \"another reckless breach of UN resolutions\" and a \"major threat\" to international peace and security \"which demands a global response.\"\n" +
        "\n" +
        "U.S. Secretary of State Rex Tillerson called on \"all nations to take new measures\" against North Korea after missile launch.\n" +
        "\n" +
        "Tillerson added that \"China and Russia must indicate their intolerance for these reckless missile launches by taking direct actions of their own.\"\n" +
        "\n" +
        "\"These continued provocations only deepen North Korea's diplomatic and economic isolation,\" he added.\n" +
        "China’s Foreign Ministry said this morning it also opposed North Korea’s use of ballistic missiles in violation of United Nations Security Council resolutions.\n" +
        "\n" +
        "A spokesman for Russian President Vladimir Putin has warned the launch will cause a spike in regional tensions.\n" +
        "\n" +
        "Dmitry Peskov told reporters that Russia \"resolutely condemns\" such moves and said that the missile test will \"lead to the further growth of tensions and the further escalation of tensions on the (Korean) peninsula.\"\n" +
        "\n" +
        "UN Secretary-General Antonio Guterres revealed talks on the crisis would be held on the sidelines of the General Assembly meeting next week.\n" +
        "\n" +
        "Guterres called on the North Korean leadership \"to cease further testing, comply with the relevant Security Council resolutions, and allow space to explore the resumption of sincere dialogue on denuclearisation,\" read a statement by his spokesman.\n" +
        "\n" +
        "The UN leader \"condemns the launch\" and said he will be discussing the situation \"with all concerned parties in the margins of the upcoming high level week of the United Nations General Assembly.\"\n" +
        "The hermit state had previously fired a Hwasong-12 intermediate range missile on August 29 which also overflew its Asian neighbours.\n" +
        "\n" +
        "That also sparked emergency sirens and text alerts before it landed in the Pacific Ocean.\n" +
        "\n" +
        "Seoul's defence ministry said both missiles were fired in Sunan close to the capital's international airport.\n" +
        "\n" +
        "South Korea said the missile probably travelled around 3,700kms and reached a maximum altitude of 770kms - both higher and further than the previous device.\n" +
        "\n" +
        "Friday's missile flew over Hokkaido in northern Japan \"at around 07:06 am\" according to the country's J-Alert system.\n" +
        "\n" +
        "The launch came as Donald Trump revealed tonight he plans to visit South Korea, China and Japan in November.\n" +
        "\n" +
        "Earlier Boris Johnson met Tillerson and vowed to punish tyrant Kim Jong-un for “defying the world”. Johnson later tweeted that the international community would stand up to despotic Kim.\n" +
        "\n" +
        "The UK and U.S. said they would push for tougher oil sanctions to be imposed in a way to cause maximum pressure.\n" +
        "Kim's regime has now successfully tested two Hwasong-14 long-range rockets over the Pacific Ocean.\n" +
        "\n" +
        "Its most recent nuclear test - the most powerful yet - was a sophisticated 120 kiloton hydrogen bomb. detonated last Sunday (September 3).\n" +
        "\n" +
        "With backing from China and Russia, the UN council voted earlier this week 15-0 to back the US-drafted ban on textile exports and restricting shipments of fuel to Pyongyang.\n" +
        "\n" +
        "This could drain millions of dollars from its economy.\n" +
        "\n" +
        "Exports of coal, lead and seafood were also banned last month after the launch of an intercontinental ballistic missile.\n" +
        "According to US military sources, North Korea has been spotted moving mobile missile launchers and preparing test sites.\n" +
        "\n" +
        "Earlier today the secretive state ramped up its threats towards America.\n" +
        "\n" +
        "“The army and people of the DPRK are unanimously demanding that the Yankees, chief culprit in cooking up the sanctions resolution, be beaten to death as a stick is fit for a rabid dog,” a statement released by the Korean Central News Agency read.\n" +
        "\n" +
        "\"Now is the time to annihilate the U.S. imperialist aggressors.\n" +
        "\n" +
        "\"Let's reduce the US mainland into ashes and darkness.\"\n" +
        "\n" +
        "World stocks were mostly lower on Friday after the launch. The Asian markets were hardest hit.";
}