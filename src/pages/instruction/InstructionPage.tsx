import { MIN_SYMBOL_COUNT, MAX_SYMBOL_COUNT } from "@/shared/constants/general"
import { Button } from "@/shared/ui/button"
import { Separator } from "@/shared/ui/separator"
import { TealBadge } from "@/shared/ui/TealBadge"
import { TextWithBackground } from "@/shared/ui/TextWithBackground"
import InfoCard from "@/widgets/info-card"
import { useNavigate } from "react-router"

export const InstructionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl p-5 flex flex-col gap-8 font-normal text-[14px]">
      <div className="flex flex-col gap-3.5">
        <h3 className="text-[24px] font-bold">Инструкция по заполнению</h3>
        <p className="py-4">
          От количества и качества информации, которую Вы дадите аналитику, будет зависеть итог анализа.
          <br />Поэтому важно внимательно ознакомиться с инструкцией для заполнения каждого из блоков.
          <br />В этой вкладке всегда можно подсмотреть наши рекомендации, соблюдая которые Вы получите максимум от AI-аналитика.
          <br /><br />Обращаем Ваше внимание на то, что ИИ является рекомендательным, а не заменяющим инструментом в анализе проекта. Venture AI очень старается, но изредка может давать сбои.
        </p>
        <Separator className="data-[orientation=horizontal]:w-[100vw] -ml-5" />
      </div>
      <div className="flex flex-col gap-8">
        <p>
          Здесь предоставлены разъяснения и советы по заполнению каждого из блоков снаглядными примерами. Сверьтесь с этими рекомендациями до того, как нажмете на кнопку «Анализировать».
          <br /><br />Теги и первые четыре поля обязательны для заполнения. Вы не сможете анализировать проект, пока не заполните их в соответствии с правилами.
          <br /><br />1. В поле не может быть менее {MIN_SYMBOL_COUNT} и более {MAX_SYMBOL_COUNT} символов.
          <br />2. Недопустимо использование специальных символов. в их числе скобки, тире, эмодзи....
          <br />3. Вы можете очистить все поля, но восстановить информацию после этого будет невозможно
        </p>
        <Separator className="data-[orientation=horizontal]:w-[100vw] -ml-5" />
      </div>
      <div className="flex flex-col gap-8">
        <h3 className="font-semibold text-[20px]">0. Теги проекта</h3>
        <div className="flex flex-col gap-5">
          <p>Теги — это ключевые слова-ассоциации, описывающие Ваш стартап. Они помогают ИИ лучше понять тему проекта и сравнить его с аналогами.</p>
          <p>Всего тегов должно быть от двух до пяти. Вписывайте их по очереди в поле ввода через клавишу  Enter. Вы можете удалить тег, нажав на него правой кнопкой мыши или зажимая его в мобильной версии.</p>
          <p>Теги должны быть короткими и состоять из 1-4 слов. Используйте понятные слова: «финтех», «образование», «маркетплейс», «ИИ», «стартап-инвестиции».</p>
          <div className="flex gap-2.5">
            {['Венчурный рынок', 'ИИ', 'Инвестиции'].map(badge => (
              <TealBadge content={badge} />
            ))}
          </div>
        </div>
        <Separator className="data-[orientation=horizontal]:w-[100vw] -ml-5" />
      </div>
      <div className="flex flex-col gap-8">
        <InfoCard
          contentClassName="flex flex-col py-5"
          imagePosition="left"
          title="1. Идея проекта"
          imageSrc="src/shared/assets/images/lightbulb.webp"
        >
          <br />
          <p>В этом блоке нужно описать основную мысль бизнеса. Кратко&nbsp;и емко распишите суть проекта, дополняя ключевыми функциями.</p>
        </InfoCard>
        <TextWithBackground>
          Создание мобильного приложения для улучшения ментального здоровья, которое предлагает персонализированные медитации, упражнения на осознанность и поддержку сообщества. Приложение будет включать в себя функции отслеживания настроения, напоминания о практике и доступ к профессиональным психологам.<br />
          В приложении есть следующие функций:
          <ul className="list-disc *:ml-5 *:marker:text-[10px] *:list-item">
            <li>Персонализированные медитации – Пользователи получают рекомендации по медитациям на основе их настроения и потребностей. Доступны аудио- и видеоформаты с разной длительностью.</li>
            <li>Упражнения на осознанность – Ежедневные задания и интерактивные курсы, направленные на развитие навыков осознанности, включая дыхательные практики и ведение дневника благодарности.</li>
            <li>Отслеживание настроения – Возможность записывать и анализировать свои эмоции. Графики показывают динамику настроения и помогают выявлять триггеры.</li>
            <li>Сообщество и поддержка – Форумы и чаты для общения между пользователями. Групповые медитации для совместного практикования.</li>
          </ul>
        </TextWithBackground>
        <Separator className="data-[orientation=horizontal]:w-[100vw] -ml-5" />
      </div>
      <div className="flex flex-col gap-8">
        <InfoCard
          contentClassName="flex flex-col"
          imagePosition="right"
          title="2. УТП продукта"
          imageSrc="src/shared/assets/images/star.webp"
        >
          <br />
          <p>Опишите уникальное торговое предложение Вашего продукта. Чем он отличается от предложений конкурентов? Почему клиенты должны выбрать Ваш продукт, а&nbsp;не&nbsp;конкурентов?</p>
        </InfoCard>
        <TextWithBackground>
          Наш сервис находит инвесторов на 30% быстрее благодаря ИИ-алгоритмам.
        </TextWithBackground>
        <ul className="list-disc *:ml-5 *:marker:text-[10px] *:list-item">
          Обратите внимание на следующие примечания:
          <li>УТП должно четко указывать на явное преимущество продукта.</li>
          <li>Избегайте расплывчатых формулировок, например:<br />«Наш продукт удобный и эффективный» (непонятно, в чем именно удобство и эффективность).</li>
        </ul>
        <Separator className="data-[orientation=horizontal]:w-[100vw] -ml-5" />
      </div>
      <div className="flex flex-col gap-8">
        <InfoCard
          contentClassName="flex flex-col -ml-5"
          imagePosition="left"
          title="3. Проблема"
          imageSrc="src/shared/assets/images/puzzle.webp"
        >
          <br />
          <p>Проблема — конкретная «боль» клиентов, которую решает Ваш продукт. Опишите ситуацию, где клиент испытывает дискомфорт.
          <br /><br />
          Крайне желательно, чтобы проблема была выражена в измеримом эквиваленте (во времени, процентах, деньгах и прочих цифрах) и подтверждена исследованиями.</p>
          <br />
          <TextWithBackground>
            По данным [исследование или источник-ссылка], 78% стартапов не находят инвесторов в первый год из-за нехватки информации о доступных фондах.
          </TextWithBackground>
        </InfoCard>
        <Separator className="data-[orientation=horizontal]:w-[100vw] -ml-5" />
      </div>
      <div className="flex flex-col gap-8">
        <InfoCard
          contentClassName="flex flex-col"
          imagePosition="right"
          title="4. Решение"
          imageSrc="src/shared/assets/images/magnifying-glass.webp"
        >
          <br />
          <p>Решение — это конкретный ответ на выявленную проблему или потребность, который направлен на достижение определенных целей и улучшение ситуации. Оно решает «боль» — недостаток, неэффективность или возможность улучшения, которые были выявлены в процессе анализа. Решение должно быть в измеримом циферном эквиваленте</p>
          <br />
          <TextWithBackground>
            Наш ИИ анализирует стартапы и подбирает им подходящих инвесторов за 48 часов, что сокращает время поиска капитала на 60%.
          </TextWithBackground>
        </InfoCard>
        <Separator className="data-[orientation=horizontal]:w-[100vw] -ml-5" />
      </div>
      <div className="flex flex-col">
        <InfoCard
          contentClassName="flex flex-col"
          imagePosition="left"
          title="5. Технология реализации продукта"
          imageSrc="src/shared/assets/images/cogs.webp"
        >
          <br />
          <p>Опишите какие технологии и инструменты используются для создания Вашего продукта.
          <br /><br />
          Назовите ключевые технологии:<br />язык программирования, фреймворки, API и т.д.</p>
          <br />
        </InfoCard>
        <TextWithBackground>
          Продукт использует Python, OpenAI GPT-4 и BigQuery для анализа данных. Анализ данных происходит по следующему алгоритму: {'[описание алгоритма].'}
        </TextWithBackground>
        <Separator className="data-[orientation=horizontal]:w-[100vw] -ml-5 mt-8" />
      </div>
      <div className="flex flex-col">
        <InfoCard
          contentClassName="flex flex-col"
          imagePosition="right"
          title="6. Целевая аудитория"
          imageSrc="src/shared/assets/images/people.webp"
        >
          <br />
          Опишите подробный портрет аудитории, для которой предназначен продукт.
          Укажите пол, возраст, профессию, уровень дохода и прочие метрики, которые могут быть полезны для анализа.
          <br />
          <br />
          <TextWithBackground>
            Молодые предприниматели 25-40 лет, у которых уже есть идея стартапа, но нет инвестиций.
          </TextWithBackground>
        </InfoCard>
        <Separator className="data-[orientation=horizontal]:w-[100vw] -ml-5 mt-8" />
      </div>
      <div className="flex flex-col">
        <InfoCard
          contentClassName="flex flex-col"
          imagePosition="left"
          title="7. Дорожная карта"
          imageSrc="src/shared/assets/images/ladder.webp"
        >
          <br />
          Дорожная карта — это этапы развития проекта. Напишите 3-5 этапов и их даты, четко их сформировав. 
          <br />
          <br />
          <TextWithBackground>
            Март 2025: Запуск MVP<br />
            Май 2025: Первые 100 клиентов<br />
            Декабрь 2025: Выход на международный рынок
          </TextWithBackground>
        </InfoCard>
        <Separator className="data-[orientation=horizontal]:w-[100vw] -ml-5 mt-8" />
      </div>
      <div className="flex flex-col">
        <InfoCard
          contentClassName="flex flex-col"
          imagePosition="right"
          title="8. Объем рынка"
          imageSrc="src/shared/assets/images/up-trend.webp"
        >
          (PAM, TAM, SAM, SOM)
          <br />
          Дорожная карта — это этапы развития проекта. Напишите 3-5 этапов и их даты, четко их сформировав. 
          <br />
          <br />
          <TextWithBackground>
            PAM: 500 млн предпринимателей в мире
            <br />TAM: 50 млн, кто ищет инвестиции
            <br />SAM: 5 млн, кто использует цифровые сервисы
            <br />SOM: 500 тыс. клиентов в первый год
          </TextWithBackground>
        </InfoCard>
        <Separator className="data-[orientation=horizontal]:w-[100vw] -ml-5 mt-8" />
      </div>
      <div className="flex flex-col">
        <InfoCard
          contentClassName="flex flex-col"
          imagePosition="left"
          title="9. Анализ конкурентов"
          imageSrc="src/shared/assets/images/target.webp"
        >
          <br />
          В этом блоке нужно перечислить 3-5 конкурентов, которые решают проблему, которую Вы описали в четвертом блоке. Опишите их сильные и слабые стороны. 
          <br />
          <br />
        </InfoCard>
        <TextWithBackground>
          Компания: StartupMatch
          <br />Сильные стороны: Большая база инвесторов, проверенные проекты.
          <br />Слабые стороны: Долгая проверка стартапов, сложный интерфейс.
          <br />
          Компания: FundFinder
          <br />Сильные стороны: Автоматизация подбора инвесторов, высокая точность анализа.
          <br />Слабые стороны: Высокая цена подписки, нет бесплатного тарифа.
        </TextWithBackground>
        <Separator className="data-[orientation=horizontal]:w-[100vw] -ml-5 mt-8" />
      </div>
      <div className="flex flex-col">
        <InfoCard
          contentClassName="flex flex-col"
          imagePosition="right"
          title="10. Стратегия коммерциализации"
          imageSrc="src/shared/assets/images/wallet.webp"
        >
          <br />
          Стратегия коммерциализации — это модель дохода и то,
          как на Вашем продукте можно зарабатывать. Это может быть подписка, разовая продажа
          или процент со сделок.
          <br />Будьте конкретны, называйте определенный процент или сумму.
          <br />
          <br />
        </InfoCard>
        <TextWithBackground>
          Мы берем 2% от привлеченных инвестиций + подписка 
          <br />$50/месяц
        </TextWithBackground>
        <Separator className="data-[orientation=horizontal]:w-[100vw] -ml-5 mt-8" />
      </div>
      <div className="flex flex-col">
        <InfoCard
          contentClassName="flex flex-col"
          imagePosition="left"
          title="11. Команда проекта"
          imageSrc="src/shared/assets/images/handshake.png"
        >
          <br />
          Команда — люди, которые стоят за стартапом. Назовите имя каждого участника и их роль
          в проекте, опишите их опыт работы.
          <br />
          <br />
          <TextWithBackground>
            Алексей – CEO, 10 лет в финансовом аудите. Иван – CTO, работал в Google на должности Backend-разработчик
          </TextWithBackground>
        </InfoCard>
        <Separator className="data-[orientation=horizontal]:w-[100vw] -ml-5 mt-8" />
      </div>
      <div className="flex flex-col">
        <InfoCard
          contentClassName="flex flex-col"
          imagePosition="right"
          title="12. Участие в научных работах, публикации в СМИ"
          imageSrc="src/shared/assets/images/dot-web.webp"
        >
          <br />
          Если у команды есть экспертные статьи, 
          исследования или упоминания в прессе, 
          в этом блоке можно о них рассказать. 
          <br />Дайте краткие описания публикаций
          и ссылки на них
          <br />
          <br />
          <TextWithBackground>
            Исследование в MIT Tech Review о будущем AI в финансах: [Ссылка].
          </TextWithBackground>
        </InfoCard>
        <Separator className="data-[orientation=horizontal]:w-[100vw] -ml-5 mt-8" />
      </div>
      <div className="flex flex-col gap-5 mb-10">
        <p>
          Все когда-то начатые проекты можно найти в разделе Проекты. Проекты, которые не были проанализированы, автоматически сохраняются в папку Черновики. Вы можете вернуться к ним влюбой момент.
        </p>
        <p>
          Так же вы можете менять названия проектов и черновиков, добавлять описание и обложки, делиться ими и удалять.
        </p>
        <Button onClick={() => navigate('/')}>
          <p className="underline font-bold text-[24px]">Вернуться на главный экран</p>
        </Button>
      </div>
    </div>
  )
}