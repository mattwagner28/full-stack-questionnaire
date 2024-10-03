--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: questionnaire_answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questionnaire_answers (
    id integer NOT NULL,
    user_id integer,
    question_id integer,
    questionnaire_id integer,
    answer jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.questionnaire_answers OWNER TO postgres;

--
-- Name: questionnaire_answers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questionnaire_answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questionnaire_answers_id_seq OWNER TO postgres;

--
-- Name: questionnaire_answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questionnaire_answers_id_seq OWNED BY public.questionnaire_answers.id;


--
-- Name: questionnaire_junction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questionnaire_junction (
    id integer NOT NULL,
    question_id integer,
    questionnaire_id integer,
    priority integer NOT NULL
);


ALTER TABLE public.questionnaire_junction OWNER TO postgres;

--
-- Name: questionnaire_junction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questionnaire_junction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questionnaire_junction_id_seq OWNER TO postgres;

--
-- Name: questionnaire_junction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questionnaire_junction_id_seq OWNED BY public.questionnaire_junction.id;


--
-- Name: questionnaire_questionnaires; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questionnaire_questionnaires (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.questionnaire_questionnaires OWNER TO postgres;

--
-- Name: questionnaire_questionnaires_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questionnaire_questionnaires_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questionnaire_questionnaires_id_seq OWNER TO postgres;

--
-- Name: questionnaire_questionnaires_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questionnaire_questionnaires_id_seq OWNED BY public.questionnaire_questionnaires.id;


--
-- Name: questionnaire_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questionnaire_questions (
    id integer NOT NULL,
    question jsonb NOT NULL
);


ALTER TABLE public.questionnaire_questions OWNER TO postgres;

--
-- Name: questionnaire_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questionnaire_questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questionnaire_questions_id_seq OWNER TO postgres;

--
-- Name: questionnaire_questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questionnaire_questions_id_seq OWNED BY public.questionnaire_questions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50),
    password character varying(100)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: questionnaire_answers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionnaire_answers ALTER COLUMN id SET DEFAULT nextval('public.questionnaire_answers_id_seq'::regclass);


--
-- Name: questionnaire_junction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionnaire_junction ALTER COLUMN id SET DEFAULT nextval('public.questionnaire_junction_id_seq'::regclass);


--
-- Name: questionnaire_questionnaires id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionnaire_questionnaires ALTER COLUMN id SET DEFAULT nextval('public.questionnaire_questionnaires_id_seq'::regclass);


--
-- Name: questionnaire_questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionnaire_questions ALTER COLUMN id SET DEFAULT nextval('public.questionnaire_questions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: questionnaire_answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questionnaire_answers (id, user_id, question_id, questionnaire_id, answer, created_at) FROM stdin;
19	13	2	1	"nope"	2024-10-03 13:54:45.846137-04
20	13	1	1	["Reduce risk of future cardiac events", "Longevity benefits"]	2024-10-03 13:54:45.84721-04
21	13	4	1	["Plant-based", "Noom"]	2024-10-03 13:54:45.848175-04
13	13	1	3	["Improve blood pressure", "Support lifestyle changes", "Reduce risk of future cardiac events"]	2024-10-03 14:22:23.845011-04
14	13	5	3	"Losing 16-50 pounds"	2024-10-03 14:22:23.846619-04
15	13	6	3	"Advil"	2024-10-03 14:22:23.848198-04
25	20	1	3	["Reduce risk of future cardiac events"]	2024-10-03 14:30:59.067405-04
26	20	5	3	"Losing 16-50 pounds"	2024-10-03 14:30:59.069677-04
27	20	6	3	"Singulair"	2024-10-03 14:30:59.073084-04
28	13	6	2	"Advil"	2024-10-03 15:09:35.226567-04
29	13	5	2	"Losing 16-50 pounds"	2024-10-03 15:09:35.228152-04
16	13	1	2	["Improve blood pressure", "Support lifestyle changes", "Reduce risk of future cardiac events"]	2024-10-03 15:09:35.229058-04
30	13	4	2	["Plant-based", "Noom"]	2024-10-03 15:09:35.229863-04
17	13	2	2	"nothing to share"	2024-10-03 15:09:35.230482-04
18	13	3	2	"177 lbs"	2024-10-03 15:09:35.230934-04
31	20	6	2	"Singulair"	2024-10-03 15:11:05.880168-04
32	20	5	2	"Losing 16-50 pounds"	2024-10-03 15:11:05.881502-04
33	20	1	2	["Improve blood pressure", "Support lifestyle changes", "Reduce risk of future cardiac events", "Longevity benefits"]	2024-10-03 15:11:05.882053-04
34	20	4	2	["Plant-based", "Calibrate"]	2024-10-03 15:11:05.882571-04
35	20	2	2	"i am steve"	2024-10-03 15:11:05.883434-04
36	20	3	2	"300 lbs"	2024-10-03 15:11:05.883947-04
37	20	3	1	"300 lbs"	2024-10-03 15:11:42.520185-04
23	20	2	1	"i am STEEEEVE"	2024-10-03 15:11:42.521937-04
24	20	4	1	["Plant-based", "Calibrate", "Weight Watchers", "Found", "Push Health"]	2024-10-03 15:11:42.522719-04
22	20	1	1	["Improve blood pressure", "Longevity benefits"]	2024-10-03 15:11:42.523422-04
38	20	5	1	"Losing 16-50 pounds"	2024-10-03 15:11:42.524094-04
39	20	6	1	"Singulair"	2024-10-03 15:11:42.524637-04
\.


--
-- Data for Name: questionnaire_junction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questionnaire_junction (id, question_id, questionnaire_id, priority) FROM stdin;
1	1	1	0
2	2	1	10
3	4	1	20
4	1	2	0
5	2	2	10
6	3	2	20
7	1	3	0
8	5	3	10
9	6	3	20
\.


--
-- Data for Name: questionnaire_questionnaires; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questionnaire_questionnaires (id, name) FROM stdin;
3	metformin
2	nad-injection
1	semaglutide
\.


--
-- Data for Name: questionnaire_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questionnaire_questions (id, question) FROM stdin;
1	{"type": "mcq", "options": ["Improve blood pressure", "Reduce risk of future cardiac events", "Support lifestyle changes", "Longevity benefits"], "question": "Why are you interested in this product? Select all that apply."}
2	{"type": "input", "question": "Tell us anything else you’d like your provider to know when prescribing your medication."}
3	{"type": "input", "question": "What is your current weight?"}
4	{"type": "mcq", "options": ["Keto or low carb", "Plant-based", "Macro or calorie counting", "Weight Watchers", "Noom", "Calibrate", "Found", "Alpha", "Push Health"], "question": "Which of the following have you tried in the past? Select all that apply."}
5	{"type": "mcq", "options": ["Losing 1-15 pounds", "Losing 16-50 pounds", "Losing 51+ pounds", "Not sure, I just need to lose weight"], "question": "What’s your weight loss goal?"}
6	{"type": "input", "question": "Please list any new medications you are taking."}
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password) FROM stdin;
17	percy	password1
19	mr_rest	password1
12	inmytree28@gmail.com	password1
14	sports	password1
15	waynecoyne	password1
16	m	password1
20	steve	password1
13	matt	password1
18	admin	password1
\.


--
-- Name: questionnaire_answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questionnaire_answers_id_seq', 39, true);


--
-- Name: questionnaire_junction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questionnaire_junction_id_seq', 9, true);


--
-- Name: questionnaire_questionnaires_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questionnaire_questionnaires_id_seq', 3, true);


--
-- Name: questionnaire_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questionnaire_questions_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 20, true);


--
-- Name: questionnaire_answers questionnaire_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionnaire_answers
    ADD CONSTRAINT questionnaire_answers_pkey PRIMARY KEY (id);


--
-- Name: questionnaire_junction questionnaire_junction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionnaire_junction
    ADD CONSTRAINT questionnaire_junction_pkey PRIMARY KEY (id);


--
-- Name: questionnaire_questionnaires questionnaire_questionnaires_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionnaire_questionnaires
    ADD CONSTRAINT questionnaire_questionnaires_name_key UNIQUE (name);


--
-- Name: questionnaire_questionnaires questionnaire_questionnaires_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionnaire_questionnaires
    ADD CONSTRAINT questionnaire_questionnaires_pkey PRIMARY KEY (id);


--
-- Name: questionnaire_questions questionnaire_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionnaire_questions
    ADD CONSTRAINT questionnaire_questions_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: questionnaire_answers questionnaire_answers_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionnaire_answers
    ADD CONSTRAINT questionnaire_answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questionnaire_questions(id);


--
-- Name: questionnaire_answers questionnaire_answers_questionnaire_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionnaire_answers
    ADD CONSTRAINT questionnaire_answers_questionnaire_id_fkey FOREIGN KEY (questionnaire_id) REFERENCES public.questionnaire_questionnaires(id);


--
-- Name: questionnaire_answers questionnaire_answers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionnaire_answers
    ADD CONSTRAINT questionnaire_answers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: questionnaire_junction questionnaire_junction_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionnaire_junction
    ADD CONSTRAINT questionnaire_junction_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questionnaire_questions(id);


--
-- Name: questionnaire_junction questionnaire_junction_questionnaire_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionnaire_junction
    ADD CONSTRAINT questionnaire_junction_questionnaire_id_fkey FOREIGN KEY (questionnaire_id) REFERENCES public.questionnaire_questionnaires(id);


--
-- PostgreSQL database dump complete
--

