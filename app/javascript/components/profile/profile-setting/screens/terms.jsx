import "./style.less";

import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

import GoBack from "../../../../images/go-back.svg";

const Terms = () => {
  const date = new Date();

  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  firstDay = format(firstDay, "MM/dd/yyyy");
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  lastDay = format(lastDay, "MM/dd/yyyy");

  return (
    <div className="text-page">
      <Link to="/profile/setting" className="go-back">
        <GoBack />
      </Link>
      <div className="text-page__title headline-medium text-grey">
        Terms and Conditions
      </div>
      <div className="text-page__text text-grey">
        <p>
          <b>Read carefully - </b>
          To keep things fair for all, we have Important conditions that users
          need to follow to take part in our game. Anyone not complying may lose
          the right to access and/or use www.melobeem.com. Remember that user
          activity is traceable and not anonymous. Online actions may have
          offline consequences. We may take legal action in serious cases of
          deliberate abuse of the processes or attempts at fraud including our
          cooperation with law enforcement agencies, banking and other
          authorities.
        </p>

        <h4>Game Details</h4>

        <p>
          <b>Competition length and dates</b>
        </p>

        <p>
          The current competition start date is {firstDay} and it ends on{" "}
          {lastDay}.
        </p>

        <p>
          <b>Users</b>
        </p>

        <p>
          To use the website fully, you must be logged in. We use Facebooks
          authentication for this. Once logged in you can access the additional
          features, enter and vote.
        </p>

        <h4>Entry Requirements</h4>

        <p>To enter the competition you must:</p>

        <ul>
          <li>
            be a registered member of the Melobeem website (www.Melobeem.com) be
            logged into your Facebook account to enter your child&apos;s details
            on the Entry form, providing the first and last name of your entry
            and gender.
          </li>
          <li>Upload a photo to the website.</li>
          <li>
            By uploading a photo you confirm that you have read and agree to our
            Terms & Conditions and your child&apos;s profile will be available
            to view online. All submissions for entries to the Melobeem game
            must be supported by explicit permission of a parent or guardian
            over 18 years of age of that child to allow reproduction of the
            image on the website and in any marketing.
          </li>
          <li>
            Entrants must hold all rights for visual content uploaded as image
            owner (parent/guardian) or by holding written consent provided to
            you by the owner (eg: a professional photographer).
          </li>
          <li>
            All entrants must be under four years old on the date they are
            entered.
          </li>
          <li>
            Entrants must ensure minors are clothed appropriately in any
            photographs provided.
          </li>
          <li>
            No entry may contain defamatory or offensive content, including but
            not limited to, images, words or symbols that are widely viewed as
            offensive to persons of a certain ethnic, religious, racial, sexual
            - orientated or socioeconomic group.
          </li>
          <li>
            Only one entry per person per competition is permitted. We reserve
            the right to remove any entries that have duplicate profiles.
          </li>
          <li>
            Only electronic entry forms received by enter page the closing date
            will be submitted to the competition. Melobeem shall be under no
            obligation to include any entry in the competition and shall incur
            no liability at any time for anything.
          </li>
          <li>
            Images submitted to the Melobeem Competition may be submitted only
            in the following file formats: jpg, gif or png and must not exceed
            size of 10MB.
          </li>
          <li>
            The winner will need to have a PayPal account in order to receive
            the cash prize.
          </li>
        </ul>

        <h4>Your Entry</h4>

        <ul>
          <li>
            Entrants agree that photos entered may appear on the Melobeem
            website, on its social media accounts and any promotional activity
            that Melobeem carry out.
          </li>
          <li>
            Entrants assign Melobeem the right to alter red eye, contrast and
            brightness on any photos submitted.
          </li>
          <li>
            Any material created by or on behalf of Melobeem utilising your
            submission material or any part thereof is and shall remain the
            property of Melobeem but for clarity you retain ownership of your
            submission material. Melobeem have the right to use the content, if
            they choose to do so. This will normally be in the form of first
            name, age and place of residence.( E.g. Tom, aged 14 months from
            London, and entry image). Each participant in the competition
            authorises that his / her entry name name and photograph can be
            published on the Melobeem site and social media platforms. By
            registering and entering (including voting in) registering ,entering
            ,or voting in the Melobeem promotion, you are consenting to the use
            of your information (including address, where collected, and e-mail)
            being used for future correspondence, by e-mail or post from
            Melobeem.
          </li>
          <li>
            You, the user, may contact us if you: 1). want to confirm the
            accuracy of the personal information we have collected about you;
            2). would like to update your personal information or delete your
            personal information; and/or 3). have any complaint regarding our
            use of your personal information. If requested, in relation to the
            information we hold, we will change any information you have
            provided to us or mark any information to prohibit future use,
            provided that you provide evidence as we may reasonably require for
            such changes.
          </li>
          <li>
            By posting any content or submitting any material you are agreeing
            to accept the competition rules and the Terms of Use and that you
            agree to be bound by them. If you do not wish to be bound by the
            rules or Terms of Use then you should not post any content or submit
            any such material.
          </li>
        </ul>

        <h4>The Winner & the Prize</h4>

        <ul>
          <li>There is no cash alternative to any none cash prize.</li>
          <li>
            The winner may be asked by Melobeem to provide specified documents
            to prove identity and parental/guardianship of the child that has
            been entered in the competition. Failure to provide such information
            may affect the entrant’s eligibility to participate or claim a prize
          </li>
          <li>
            Melobeem will aim to post the named winner(s) on the website no
            later than one week after the closing date. No correspondence will
            be entered into with other entrants. Melobeem reserves the right, at
            its sole discretion, to disqualify any entry. This will not normally
            occur unless we have reasonable grounds to believe an entry has
            breached any of the competition terms.
          </li>
          <li>The winner will be notified via by email.</li>
          <li>
            Employees (and their relatives) of Melobeem and its partner
            companies are excluded from entering the competition.
          </li>
          <li>
            Melobeem will endeavour to deliver the prize at a mutually
            convenient time to be agreed upon between the winners and the prize
            provider. A winner, as a condition of prize acceptance, may be asked
            to take part in a small scale promotional activity or advertising
            organised by Melobeem or it&apos;s partners.
          </li>
        </ul>

        <p>
          <b>Terms of use / Rules</b>
        </p>

        <ul>
          <li>
            These Rules are here to help you understand what you can and
            can&apos;t do as a member of our online community and user of the
            Melobeem game and any other interactive parts of the
            www.Melobeem.com website (&quot;Website&quot;).
          </li>
          <li>
            You agree that you own or otherwise control all of the rights to the
            content that you post at the date the content or material is
            submitted to the website: (i) the content and material is accurate;
            (ii) use of the content and material you supply does not breach any
            applicable policies or guidelines outlined by the website owner;
            (iii) any comments posted will not have any effect on the outcome of
            the game.
          </li>
        </ul>

        <p>
          If you do post any content or submit material, you irrevocably and
          unconditionally waive any moral rights or performers&apos; rights that
          you may have or may acquire in relation to any such content or
          material. If you delete your entry or Melobeem deletes your entry for
          violating any of our terms of use you will not be reimbursed for funds
          or time spent on the entry during the period which it was live.
        </p>

        <p>
          Users of the website may vote for an entry by clicking the vote button
          on an individual&apos;s entry provided they comply with the
          competition rules. Users found to be doing any of the three points
          below will be considered to be cheating and will be eliminated from
          the competition as soon as identified with no refunds for purchases
          made given to the banned user or anybody who voted for their entry.
        </p>

        <ul>
          <li>
            Participants found to have acquired a high number of votes via vote
            exchange websites / groups or proxy server.
          </li>
          <li>
            found to be creating multiple Facebook accounts to vote for an entry
          </li>
          <li>
            found to have been using vote farms, or purchased votes externally
            to this website
          </li>
          <li>using vote exchange websites/groups</li>
          <li>
            Users of the website may post comments or &apos;like&apos; an entry
            in accordance with the game provided such comments /content is not,
            in the opinion of Melobeem, illegal, obscene, abusive, threatening,
            defamatory, invasive of privacy, infringing of intellectual property
            rights, or otherwise injurious to third parties, or objectionable
            and does not consist of or contain software viruses, political
            campaigning, chain letters, mass mailings, commercial solicitation,
            or any form of &apos;spam&apos;. Users may not use a false email
            address, impersonate any person or entity, or otherwise mislead as
            to the origin of anything posted.Breaches of these conditions may
            result in users being barred from further involvement in the game.
            Comments posted by an user will not have any effect on the
            competition outcome.
          </li>
          <li>
            Because www.melobeem.com hosts many thousands of happy users &
            comments, it is not always practicable for us to be aware of each
            and every comment published. We will of course endeavour to monitor
            comments regularly. However, should one breach aforementioned
            guidelines and policies, there is an opportunity for users to
            utilise the Report button, which may appear on every entrant&apos;s
            page. You can alternatively email the support team. The Melobeem
            team operate on a &quot;notice and takedown&quot; basis. If you
            believe that any content on the website contains a defamatory
            statement, please notify us immediately by using the Report button
            or via the support email support@pandere.io. Once reported Melobeem
            will make reasonable endeavours to investigate and assess the
            reported content within a reasonable time and remove as appropriate.
          </li>
          <li>
            Once users have successfully purchased any products through our
            website via one of our payment processors (PayPal, Stripe), they
            agree to not claim these back by chargeback process. Failure to
            comply with this will result in a ban and possible further legal or
            administrative action. If there has been a genuine, inappropriate
            payment or error then that should be declared for consideration by
            the Melobeem support inbox support@pandere.io for refund.
          </li>
          <li>
            You agree that under no circumstances will Melobeem or its holding
            company be responsible or liable to you or any other person or
            entity for any direct, indirect consequential loss or damage arising
            out of or in connection with its operations (including, but not
            limited to, the use of photos or competition prizes), the ability to
            use this service or the alteration to or the transmission of any
            data. Nothing in these terms affects the statutory rights of any
            entrant under English law or excludes or limits the liability for
            death or personal injury arising from negligence or other liability
            which cannot be excluded or limited under English law.You may not
            systematically extract and/or re-utilise parts of the contents of
            the website without Melobeems express written consent. In
            particular, you may not utilise any data mining, robots, or similar
            data gathering and extraction tools to extract (whether once or many
            times) for re-utilisation of any parts of this website, without
            Melobeems express written consent.
          </li>
          <li>
            Copyright: This Website and its contents are copyright of Pandere.
            All rights reserved. Reproduction of all or any substantial part of
            the contents in any form is prohibited. No part of the site may be
            distributed or copied for any commercial purpose without express
            written consent.
          </li>
        </ul>

        <h4>Dos and Don&apos;ts</h4>

        <ul>
          <li>
            Do use your common sense. We want the area to be an engaging and
            enjoyable place. We want to help ensure you behave reasonably and
            sensibly. What is - or is not - acceptable is usually a matter of
            common sense.
          </li>
          <li>
            Do remember that this area is moderated in part only and that we do
            not pre-screen material before it is posted. Moderators will help
            moderate and manage real-time discussion and we will run regular
            checks of user submissions in addition, but sometimes submissions
            are made that are inappropriate. As in any community we need your
            assistance to control this issue.
          </li>
          <li>
            Do respect other users. Lots of us have strong beliefs about many
            things. That doesn&apos;t mean we can&apos;t agree to disagree.
            Please remember that others have a right to an opinion that may
            differ from yours.
          </li>
          <li>
            Do report any comments, posts, videos, photographs or anything else
            in this area (or elsewhere on the Website) which breach these rules
            or offend you or make you feel uncomfortable. Without your help in
            reporting objectionable content or other inappropriate submissions
            and behaviour, the area won&apos;t work as well. Please provide as
            much relevant information as you can. We will always treat reports
            seriously and, where appropriate, in confidence. We also provide
            links to outside agencies and authorities, but in most circumstances
            you should report the submission to us in the first instance.
          </li>
          <li>
            Do remember that we reserve the right to use, delete, edit, move and
            merge your submissions without telling you and that our (or our
            moderators) decisions are final.
          </li>
          <li>
            Do submit your comments in English. This helps us to check that the
            submission is appropriate.
          </li>
          <li>
            Do check these rules regularly as we may need to change them and
            please be aware that additional usage terms may also apply and these
            will be marked on the relevant part of the Website.
          </li>
          <li>
            Don&apos;t engage in personal abuse or express any kind of hatred
            towards any group because of their religious, racial, ethnic origin,
            sexual orientation, gender, age or disability. Discuss the points
            made intelligently in a submission, not directly towards the person
            putting it forward.
          </li>
          <li>
            Don&apos;t make any submissions which are obscene or may be
            considered to be offensive, or illegal or to promote illegal or
            inappropriate behaviour.
          </li>
          <li>
            Don&apos;t use the area in a manner that interferes with, or
            disrupts, anyone else&apos;s use or enjoyment of the site.
            Don&apos;t impersonate others or otherwise make fraudulent or
            deceptive postings.
          </li>
          <li>
            Don&apos;t make submissions which are off-topic, unless we state
            that such off-topic submissions are allowed in a particular area of
            the Website.
          </li>
          <li>
            Don&apos;t submit libellous or defamatory remarks. That means not
            submitting anything which you can&apos;t prove to be true and which
            might damage someone&apos;s reputation.
          </li>
          <li>
            Don&apos;t post comments about people&apos;s private lives or any
            matter which is the subject of on-going legal proceedings. If in
            doubt, don&apos;t post it!
          </li>
          <li>Don&apos;t endanger yourself or others.</li>
          <li>Do respect people&apos;s privacy.</li>
          <li>
            Do keep personal information private and don&apos;t post email
            addresses, phone numbers or other personal data in a comment of an
            entrant.
          </li>
          <li>
            Don&apos;t advertise or use this area for commercial purposes.
          </li>
          <li>
            Once again, these simple rules have been written with one aim in
            mind, for you to enjoy the area and keep it safe and fun.
          </li>
        </ul>

        <h4>Promotors and the Website</h4>

        <ul>
          <li>
            This website and competition is run by Pandere Limited (Company
            Number 08586818).
          </li>
          <li>
            The Promoters of www.melobeem.com reserve the right (but not the
            obligation) to remove or edit any content.
          </li>
          <li>
            Pandere Limited accept no responsibility for pictures being copied
            and / or shared from the competition site (melobeem.com).
          </li>
          <li>
            Any information you give us through our website will be retained and
            processed in accordance with The General Data Protection Regulation
            (EU) 2016/679 (GDPR). The Act makes sure that your personal details
            are collected, kept and used in a lawful and fair way. Under The
            General Data Protection Regulation (EU) 2016/679 (GDPR), we follow
            strict security procedures in the storage and disclosure of
            information, which you have given us to prevent unauthorised access.
            Our security procedures mean that we may occasionally request proof
            of identity before we are able to disclose sensitive information to
            you.
          </li>
          <li>
            The use of the Site in accordance with these terms and conditions is
            a legal agreement between us. English law will apply to that
            agreement, notwithstanding the jurisdiction where you are based. You
            irrevocably agree that the courts of England will have exclusive
            jurisdiction to settle any dispute which may arise out of, under, or
            in connection with these terms and conditions and for those purposes
            irrevocably submit all disputes to the jurisdiction of the English
            courts. The place of performance shall be England.
          </li>
          <li>
            Any information you give us through our website will be retained and
            processed in accordance with The General Data Protection Regulation
            (EU) 2016/679 (GDPR). The Act makes sure that your personal details
            are collected, kept and used in a lawful and fair way. Under The
            General Data Protection Regulation (EU) 2016/679 (GDPR), we follow
            strict security procedures in the storage and disclosure of
            information, which you have given us to prevent unauthorised access.
            Our security procedures mean that we may occasionally request proof
            of identity before we are able to disclose sensitive information to
            you.
          </li>
          <li>
            All content included on the website, such as text, graphics, logos,
            button icons, images, audio clips, digital downloads, data
            compilations, and software, is the property of the Promoters, its
            affiliates or its content suppliers and is protected by
            international copyright, authors&apos; rights and database right
            laws. The compilation of all content on this website is the
            exclusive property of the Promoters and its affiliates and is
            protected by United Kingdom and international copyright and database
            right laws. All software used on this website is the property of the
            Promoters, our affiliates or our software suppliers and is protected
            by international copyright and author&apos; rights laws.
          </li>
          <li>
            The use of the Site in accordance with these terms and conditions is
            a legal agreement between us. English law will apply to that
            agreement, notwithstanding the jurisdiction where you are based. You
            irrevocably agree that the courts of England will have exclusive
            jurisdiction to settle any dispute which may arise out of, under, or
            in connection with these terms and conditions and for those purposes
            irrevocably submit all disputes to the jurisdiction of the English
            courts. The place of performance shall be England.
          </li>
          <li>
            The Promoters warrant and represent for all claims brought by a
            third party against www.melobeem.com or its approved and credible
            partners arising out of or in connection with a breach of any of
            these warranties.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Terms;
