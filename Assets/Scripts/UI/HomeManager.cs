using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace DarkDescent
{
	public class HomeManager : MonoBehaviour
	{
		[SerializeField] GameObject loginUsernameInput;
		[SerializeField] GameObject loginPasswordInput;
		[SerializeField] GameObject loginPanel;
		[SerializeField] GameObject loginBtn;

		[SerializeField] GameObject characterSelectPanel;
		[SerializeField] float slideSpeed;

		RectTransform loginRect;
		RectTransform charSelectRect;

		bool slideCharSelectDown = false;


		float height;

		void Start()
		{
			loginRect = loginPanel.GetComponent<RectTransform>();
			charSelectRect = characterSelectPanel.GetComponent<RectTransform>();

			height = GetComponent<RectTransform>().sizeDelta.y;

			charSelectRect.offsetMin = new Vector2(0, height);
			charSelectRect.offsetMax = new Vector2(0, height);

			loginBtn.GetComponent<Button>().onClick.AddListener(OnLoginBtnClicked);
		}

		void OnLoginBtnClicked()
		{
			var usernameInput = loginUsernameInput.GetComponent<InputField>();
			var passwordInput = loginPasswordInput.GetComponent<InputField>();
			Debug.Log(usernameInput.text);
			Debug.Log(passwordInput.text);

			slideCharSelectDown = true;
		}

		void Update()
		{
			if (Input.GetKeyDown(KeyCode.Tab))
			{
				if (Input.GetKey(KeyCode.LeftShift))
				{
					if (EventSystem.current.currentSelectedGameObject != null)
					{
						Selectable selectable = EventSystem.current.currentSelectedGameObject.GetComponent<Selectable>().FindSelectableOnUp();
						if (selectable != null)
							selectable.Select();
					}
				}
				else
				{
					if (EventSystem.current.currentSelectedGameObject != null)
					{
						Selectable selectable = EventSystem.current.currentSelectedGameObject.GetComponent<Selectable>().FindSelectableOnDown();
						if (selectable != null)
							selectable.Select();
					}
				}
			}

			if (slideCharSelectDown)
			{
				var off = charSelectRect.offsetMin.y;

				off -= slideSpeed * Time.deltaTime;

				if (off < 0)
				{
					slideCharSelectDown = false;
					off = 0;
				}

				charSelectRect.offsetMin = new Vector2(0, off);
				charSelectRect.offsetMax = new Vector2(0, off);
				loginRect.offsetMin = new Vector2(0, off - height);
				loginRect.offsetMax = new Vector2(0, off - height);
			}
		}
	}
}
