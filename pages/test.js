import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "react-share";
// 436960254375132;

export default function test() {
  return (
    <>
      <div>test social media sharer</div>
      <FacebookShareButton url='https://github.com/wilkersoh'>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <WhatsappShareButton url='https://github.com/wilkersoh'>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
      <FacebookMessengerShareButton appId='436960254375132'>
        <FacebookMessengerIcon siez={32} round={true} />
      </FacebookMessengerShareButton>
    </>
  );
}
